import type { NextConfig } from "next";

const nextConfig: NextConfig = {
redirects: async () => {
    return [
        {
            source: "/",
            destination: "/jokes",
            permanent: true,
        },
    ];
},
};

export default nextConfig;
