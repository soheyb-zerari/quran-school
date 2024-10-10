import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { Client, Databases, Account } from "node-appwrite";

const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT as string)
    .setProject(process.env.APPWRITE_PROJECT_ID as string)
    .setKey(process.env.APPWRITE_API_KEY as string);

  return {
    get Account() {
      return new Account(client);
    },
    get Databases() {
      return new Databases(client);
    },
  };
};

const createSessionClient = async (session: RequestCookie | undefined) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT ?? "")
    .setProject(process.env.APPWRITE_PROJECT_ID ?? "");

  if (session) {
    client.setSession(session.value);
  }

  return {
    get Account() {
      return new Account(client);
    },
    get Databases() {
      return new Databases(client);
    },
  };
};

export { createAdminClient, createSessionClient };
