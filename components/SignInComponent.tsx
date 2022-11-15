'use client';

import { FC } from 'react';
import { getProviders, signIn } from 'next-auth/react';

interface SignInComponentProps {
    providers: Awaited<ReturnType<typeof getProviders>>;
}

const SignInComponent: FC<SignInComponentProps> = ({ providers }) => {
    return (
        <div>
            {Object.values(providers!).map((provider) => (
                <div
                    className="flex items-center justify-center"
                    key={provider.name}
                >
                    <button
                        className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 ease"
                        onClick={() =>
                            signIn(provider.id, {
                                callbackUrl:
                                    process.env.VERCEL_URL ||
                                    'http://localhost:3000',
                            })
                        }
                    >
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SignInComponent;
