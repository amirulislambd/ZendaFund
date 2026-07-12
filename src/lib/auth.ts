import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { customSession } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("ZendaFund");

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET as string,
    baseURL: process.env.BETTER_AUTH_URL as string,
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "supporter",
                input: true,
            },
            credits: {
                type: "number",
                required: true,
                defaultValue: 50,
                input: true,
            },
            profilePic: {
                type: "string",
                required: false,
                input: true,
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [
        customSession(async ({ user, session }) => {
            const extendedUser = user as typeof user & {
                role?: string;
                credits?: number;
                profilePic?: string;
            };

            return {
                user: {
                    ...extendedUser,
                    role: extendedUser.role,
                    credits: extendedUser.credits,
                    profilePic: extendedUser.profilePic,
                    image: extendedUser.profilePic || extendedUser.image,
                },
                session,
            };
        }),
    ],
});