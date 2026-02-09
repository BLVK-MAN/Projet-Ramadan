import { z } from "zod";

export const chatSchema = z.object({
    message: z.string().min(1, "Message cannot be empty"),
});

export const fileUploadSchema = z.object({
    files: z.array(z.instanceof(File)).min(1, "At least one file is required"),
});
