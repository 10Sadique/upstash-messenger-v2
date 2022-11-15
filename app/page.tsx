import { unstable_getServerSession } from 'next-auth';
import React from 'react';
import ChatInput from '../components/ChatInput';
import MessageList from '../components/MessageList';
import { Message } from '../typings';
import { Providers } from './providers';

const HomePage = async () => {
    const res = await fetch(
        `${process.env.VERCEL_URL || 'http://localhost:300'}/api/getMessages`
    );
    const data = await res.json();
    const messages: Message[] = data.messages;

    const session = await unstable_getServerSession();

    return (
        <Providers session={session}>
            <main>
                {/* MessageList here */}
                <MessageList initialMessages={messages} />
                {/* ChatInput here */}
                <ChatInput session={session} />
            </main>
        </Providers>
    );
};

export default HomePage;
