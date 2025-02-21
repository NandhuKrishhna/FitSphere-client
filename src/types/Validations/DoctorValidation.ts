import { z } from "zod";


export const slotSchema = z.object({
  doctorId: z.string().min(1, "Doctor ID is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  consultationType: z.enum(["video", "audio"], { message: "Invalid consultation type" }),
}).refine((data) => data.startTime < data.endTime, {
  message: "Start time must be before end time",
  path: ["startTime"],
});

