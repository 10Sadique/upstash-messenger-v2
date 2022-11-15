'use client';

import { FC, useEffect } from 'react';
import fetcher from '../utils/fetchMessages';
import useSWR from 'swr';
import MessageComponent from './MessageComponent';
import { clientPusher } from '../pusher';
import { Message } from '../typings';

interface MessageListProps {
    initialMessages: Message[];
}

const MessageList: FC<MessageListProps> = ({ initialMessages }) => {
    const {
        data: messages,
        error,
        mutate,
    } = useSWR('/api/getMessages', fetcher);

    useEffect(() => {
        const channel = clientPusher.subscribe('messages');

        channel.bind('new-message', async (data: Message) => {
            // if i send the message, no need to update cache
            if (messages?.find((message) => message.id === data.id)) return;

            if (!messages) {
                mutate(fetcher);
            } else {
                mutate(fetcher, {
                    optimisticData: [data, ...messages!],
                    rollbackOnError: true,
                });
            }
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages, mutate, clientPusher]);

    return (
        <div className="max-w-2xl px-5 pt-8 pb-32 mx-auto space-y-5 xl:max-w-4xl">
            {(messages || initialMessages).map((message) => (
                <MessageComponent key={message.id} message={message} />
            ))}
        </div>
    );
};

export default MessageList;
