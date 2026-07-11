import { createAuthClient } from "better-auth/react";
import {
  customSessionClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string" },
        credits: { type: "number" },
        profilePic: { type: "string" },
      },
    }),
    customSessionClient<typeof auth>(),
  ],
});

export const { signIn, signUp, useSession, signOut } = authClient;
