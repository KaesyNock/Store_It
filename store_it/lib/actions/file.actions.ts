
'use server';

import  UploadFileProps  from "@/types"
import { createAdminClient } from "../appwrite";

const handleError = (error: unknown, message: string) => {
    console.log(error, message);
    throw error;
};

export const uploadFile = async ({
    file,
    ownerId,
    accountId,
    path,
}: UploadFileProps) => {
    const { storage, databases } = await createAdminClient();

    try {
        
    }

    catch {
        handleError(Error, "Failed to sign in user");
    }