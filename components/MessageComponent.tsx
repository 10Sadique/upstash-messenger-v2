import Image from 'next/image';
import { FC } from 'react';
import { Message } from '../typings';

interface MessageComponentProps {
    message: Message;
}

const MessageComponent: FC<MessageComponentProps> = ({ message }) => {
    const isUser = true;

    return (
        <div className={`flex w-fit ${isUser && 'ml-auto'}`}>
            {/* profile picture */}
            <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
                <Image
                    className="mx-2 rounded-full"
                    src={message.profilePic}
                    alt="Profile Pic"
                    height={10}
                    width={50}
                />
            </div>

            {/* message body */}
            <div>
                <p
                    className={`px-[2px] pb-[2px] text-[0.65rem]  ${
                        isUser
                            ? 'text-blue-400 text-right'
                            : 'text-red-400 text-left'
                    }`}
                >
                    {message.username}
                </p>

                <div className="flex items-end">
                    <div
                        className={`px-3 py-2 text-white  rounded-lg w-fit ${
                            isUser
                                ? 'bg-blue-400 ml-auto order-2'
                                : 'bg-red-400'
                        }`}
                    >
                        <p>{message.message}</p>
                    </div>
                    <p
                        className={`text-[0.65rem] italic px-2 text-gray-300 ${
                            isUser && '-order-1 text-right'
                        }`}
                    >
                        {new Date(message.created_at).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MessageComponent;
