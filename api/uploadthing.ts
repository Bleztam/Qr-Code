import { createUploadthing, type FileRouter } from "uploadthing/express";
import { createRouteHandler } from "uploadthing/express";
import express from "express";

const f = createUploadthing();

export const uploadRouter = {
  // Define a route for handling image uploads
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .onUploadComplete((data) => {
      console.log("Upload completed", data);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;

const app = express();
app.use("/api/uploadthing", createRouteHandler({ router: uploadRouter }));

export default app;
