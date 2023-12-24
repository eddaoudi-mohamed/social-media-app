import { Client, Account, Databases, Storage, Avatars } from "appwrite";
import { env } from "process";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_PROJECT_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  postsId: import.meta.env.VITE_APPWRITE_POSTS_ID,
  usersId: import.meta.env.VITE_APPWRITE_USERS_ID,
  savesId: import.meta.env.VITE_APPWRITE_SAVES_ID,
};

export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);
export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
