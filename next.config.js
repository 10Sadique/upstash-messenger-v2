/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: [
            'links.papareact.com',
            'i.ibb.co',
            'platform-lookaside.fbsbx.com',
        ],
    },
    experimental: {
        appDir: true,
    },
};
