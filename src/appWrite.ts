import { Client, Account, Databases, ID, Query } from "appwrite"

// Initialize Appwrite client
export const client = new Client()

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || "")

// Initialize Appwrite services
export const account = new Account(client)
export const databases = new Databases(client)

// Database and collection IDs
export const DATABASES = {
  MAIN: import.meta.env.VITE_APPWRITE_DATABASE_ID || "",
}

export const COLLECTIONS = {
  TRIPS: import.meta.env.VITE_APPWRITE_TRIPS_COLLECTION_ID || "",
  USERS: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID || "",
}

export { ID, Query }
