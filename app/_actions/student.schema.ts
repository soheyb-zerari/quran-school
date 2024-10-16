"use server";

import { createAdminClient } from "@/config/appwrite";
import { checkAuth } from "./auth.action";

const getStudents = async () => {
  const { isAuthenticated } = await checkAuth();

  if (!isAuthenticated) {
    return {
      error: "You are not authenticated",
    };
  }

  const { Databases } = await createAdminClient();

  const databaseId = process.env.APPWRITE_DATABASE_ID as string;
  const collectionId = process.env.APPWRITE_COLLECTION_STUDENT as string;

  const students = await Databases.listDocuments(databaseId, collectionId);

  return students;
};

export { getStudents };
