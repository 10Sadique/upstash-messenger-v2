'use client';

import { FC } from 'react';
import fetcher from '../utils/fetchMessages';
import useSWR from 'swr';
import MessageComponent from './MessageComponent';

interface MessageListProps {}

const MessageList: FC<MessageListProps> = ({}) => {
    const {
        data: messages,
        error,
        mutate,
    } = useSWR('/api/getMessages', fetcher);

    return (
        <div className="max-w-2xl px-5 pt-8 pb-32 space-y-5 xl:max-w-4xl">
            {messages?.map((message) => (
                <MessageComponent key={message.id} message={message} />
            ))}
        </div>
    );
};

export default MessageList;
