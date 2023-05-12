const fs = require("fs");

const path = require("path");



/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions: true
    },
    images:{
        domains:[
            "lh3.googleusercontent.com"
        ]
    },
    env:{
        NEXT_PUBLIC_JWT: fs.readFileSync(path.join(__dirname, "./keys/public.key"), "utf-8"),

        JWT_PRIVATE_KEY: fs.readFileSync(path.join(__dirname, "./keys/private.key"), "utf-8")
    }
}

module.exports = nextConfig
