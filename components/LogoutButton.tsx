'use client';

import { signOut } from 'next-auth/react';

const LogoutButton = () => {
    return (
        <button
            onClick={() => signOut()}
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 ease"
        >
            Sign Out
        </button>
    );
};

export default LogoutButton;
