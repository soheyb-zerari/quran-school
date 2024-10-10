"use server";

import { createAdminClient, createSessionClient } from "@/config/appwrite";
import { loginSchema } from "../_schemas/login.schema";
import { cookies } from "next/headers";

const createSession = async (previousState: unknown, formData: FormData) => {
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validated = loginSchema.safeParse(user);

  if (!validated.success) {
    return { error: validated.error?.errors[0].message };
  }

  const { Account } = await createAdminClient();

  try {
    const session = await Account.createEmailPasswordSession(
      user.email as string,
      user.password as string
    );
    cookies().set("appwrite-session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(session.expire),
      path: "/",
    });

    return { success: true };
  } catch (err: unknown) {
    console.log("Authentication Error ", err);
    return {
      error: "معلوماتك خاطئة",
    };
  }
};

const destroySession = async () => {
  const sessionCookie = cookies().get("appwrite-session");

  if (!sessionCookie) {
    return {
      error: "no session cookie found",
    };
  }

  try {
    const { Account } = await createSessionClient(sessionCookie);

    await Account.deleteSession("current");

    cookies().delete("appwrite-session");

    return {
      success: true,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: unknown) {
    return {
      error: "error deleting session",
    };
  }
};

const checkAuth = async () => {
  const sessionCookie = cookies().get("appwrite-session");

  if (!sessionCookie) {
    return {
      isAuthenticated: false,
    };
  }

  try {
    const { Account } = await createSessionClient(sessionCookie);
    const user = Account.get();

    return {
      isAuthenticated: true,
      user: {
        id: (await user).$id,
        name: (await user).name,
      },
    };
  } catch (err: unknown) {
    return {
      isAuthenticated: false,
    };
  }
};

export { createSession, destroySession, checkAuth };
