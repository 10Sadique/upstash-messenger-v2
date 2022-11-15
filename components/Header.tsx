import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

const Header = () => {
    // session from next auth
    /**
     * @todo pull session from next-auth
     */
    const session = true;

    if (session) {
        return (
            <header className="sticky top-0 z-50 flex items-center justify-between px-10 py-3 bg-white shadow-sm">
                <div className="flex space-x-2">
                    <Image
                        className="object-contain mx-2 rounded-full"
                        height={10}
                        width={50}
                        alt="Profile Picture"
                        // src={session?.user?.image}
                        src={`https://links.papareact.com/jne`}
                    />
                    <div>
                        <p className="text-blue-400">Logged in as:</p>
                        <p className="text-lg font-bold">Jafar Sadique Jahan</p>
                    </div>
                </div>
                <LogoutButton />
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-50 flex items-center justify-center px-10 py-3 bg-white shadow-sm">
            <div className="flex flex-col items-center space-y-5">
                <div className="flex items-center space-x-2">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-10 h-10 text-blue-500" />
                    <p className="text-blue-500">Welcome to Messenger 2.0</p>
                </div>
                <Link
                    href={`/auth/signin`}
                    className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 ease"
                >
                    Sign In
                </Link>
            </div>
        </header>
    );
};

export default Header;
