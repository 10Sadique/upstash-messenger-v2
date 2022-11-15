import React from 'react';
import ChatInput from '../components/ChatInput';
import MessageList from '../components/MessageList';
import { Message } from '../typings';

const HomePage = async () => {
    const res = await fetch(
        `${process.env.VERCEL_URL || 'http://localhost:300'}/api/getMessages`
    );
    const data = await res.json();

    const messages: Message[] = data.messages;

    return (
        <main>
            {/* MessageList here */}
            <MessageList initialMessages={messages} />
            {/* ChatInput here */}
            <ChatInput />
        </main>
    );
};

export default HomePage;
