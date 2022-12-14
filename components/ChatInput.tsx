'use client';

import { FC, FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Message } from '../typings';
import useSWR from 'swr';
import fetcher from '../utils/fetchMessages';
import { unstable_getServerSession } from 'next-auth';

interface ChatInputProps {
    session: Awaited<ReturnType<typeof unstable_getServerSession>>;
}

const ChatInput: FC<ChatInputProps> = ({ session }) => {
    const [input, setInput] = useState('');
    const {
        data: messages,
        error,
        mutate,
    } = useSWR('/api/getMessages', fetcher);

    // handle send message
    /**
     * @TODO add message to to MessageList
     */
    const addMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!input || !session) return;

        const messageToSend = input;

        setInput('');

        const id = uuid();

        const message: Message = {
            id,
            message: messageToSend,
            created_at: Date.now(),
            username: session?.user?.name!,
            profilePic: session?.user?.image!,
            email: session?.user?.email!,
        };

        const uploadMessageToUpstash = async () => {
            const res = await fetch(`/api/addMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            const data = await res.json();

            return [data.message, ...messages!];
        };

        await mutate(uploadMessageToUpstash, {
            optimisticData: [message, ...messages!],
            rollbackOnError: true,
        });
    };

    return (
        <form
            onSubmit={addMessage}
            className="fixed bottom-0 z-50 flex items-center w-full px-10 py-5 space-x-2 bg-white border-t border-gray-200"
        >
            <input
                type="text"
                value={input}
                disabled={!session}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter message here..."
                className="flex-1 px-5 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
                type="submit"
                disabled={!input}
                className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ease"
            >
                Send
            </button>
        </form>
    );
};

export default ChatInput;
