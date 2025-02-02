import { z } from "zod";
export const professionalSchema = z.object({
  experience: z
    .string()
    .min(1, { message: "Experience must be at least 1 year." })
    .regex(/^\d+$/, { message: "Experience must be a positive number." })
    .default("0"),

  consultationFees: z
    .string()
    .min(1, { message: "Consultation fee must be at least 1." })
    .regex(/^\d+$/, { message: "Consultation fee must be a positive number." })
    .default("0"),

    contactPhoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .max(10, { message: "Phone number must be exactly 10 digits." })  // Optional: change max for other valid lengths if needed
    .regex(/^\d{10}$/, { message: "Phone number must contain exactly 10 digits." })
    .default(""),
  

  professionalEmail: z
    .string()
    .email({ message: "Enter a valid email address." })
    .default(""),

  officeAddress: z
    .string()
    .min(5, { message: "Office address must be at least 5 characters long." })
    .default(""),

  clinicLocations: z
    .string()
    .min(1, { message: "Clinic location cannot be empty." })
    .default(""),

  consultationLanguages: z
    .string()
    .min(1, { message: "Consultation language cannot be empty." })
    .default(""),

  primarySpecialty: z
    .string()
    .min(1, { message: "Primary specialty is required." })
    .default(""),

  medicalLicenseNumber: z
    .string()
    .min(1, { message: "Medical license number is required." })
    .default(""),

  gender: z
    .enum(["Male", "Female"], { message: "Gender must be either Male or Female." })
    .default("Female"),

  professionalTitle: z
    .string()
    .min(1, { message: "Professional title is required." })
    .default(""),

  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters long." })
    .default(""),
});