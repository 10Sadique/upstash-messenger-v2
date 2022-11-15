'use client';

const LogoutButton = () => {
    // handling sign out
    /**
     * @TODO implement sign out using next-auth
     */
    const handleLogOut = () => {
        console.log('Hello');
    };

    return (
        <button
            onClick={handleLogOut}
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 ease"
        >
            Sign Out
        </button>
    );
};

export default LogoutButton;
