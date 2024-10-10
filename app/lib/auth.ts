import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { Models } from "node-appwrite";

const auth: {
  user: Models.User<Models.Preferences> | null; // Provide a type argument for the generic type 'User'
  sessionCookie: RequestCookie | undefined | null;
  getUser: () => Promise<void>;
} = {
  user: null,
  sessionCookie: null,

  getUser: async () => {
    auth.sessionCookie = cookies()?.get("appwrite-session");

    try {
      const { Account } = await createSessionClient(auth.sessionCookie);
      auth.user = await Account.get();
    } catch (err) {
      console.log(err);
      auth.user = null;
      auth.sessionCookie = null;
    }
  },
};

export default auth;
