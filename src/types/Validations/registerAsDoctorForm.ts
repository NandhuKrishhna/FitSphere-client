import { z, ZodType } from "zod";
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
    .max(10, { message: "Phone number must be exactly 10 digits." })
    .regex(/^\d{10}$/, { message: "Phone number must contain exactly 10 digits." })
    .default(""),

  professionalEmail: z.string().email({ message: "Enter a valid email address." }).default(""),

  officeAddress: z.string().min(5, { message: "Office address must be at least 5 characters long." }).default(""),

  clinicLocations: z.string().min(1, { message: "Clinic location cannot be empty." }).default(""),

  consultationLanguages: z.string().min(1, { message: "Consultation language cannot be empty." }).default(""),

  primarySpecialty: z.string().min(1, { message: "Primary specialty is required." }).default(""),

  medicalLicenseNumber: z.string().min(1, { message: "Medical license number is required." }).default(""),

  gender: z.enum(["Male", "Female"], { message: "Gender must be either Male or Female." }).default("Female"),

  professionalTitle: z.string().min(1, { message: "Professional title is required." }).default(""),

  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters long." })
    .max(300, { message: "Bio cannot exceed 200 characters." })
    .default(""),

  certificate: z.string().optional(),
});

export type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type LoginData = {
  email: string;
  password: string;
};
export type EmailData = {
  email: string;
};
export type PasswordData = {
  password: string;
  confirmPassword: string;
};

export const userRegisterSchema: ZodType<FormData> = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(30, { message: "Name cannot exceed 30 characters" })
      .nonempty({ message: "Name is required" }),

    email: z.string().email({ message: "Enter a valid email address" }).nonempty({ message: "Email is required" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(30, { message: "Password cannot exceed 25 characters" })
      .nonempty({ message: "Password is required" }),

    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters long" })
      .max(30, { message: "Confirm Password cannot exceed 25 characters" })
      .nonempty({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema: ZodType<LoginData> = z.object({
  email: z.string().email({ message: "Enter a valid email address" }).nonempty({ message: "Email is required" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(30, { message: "Password cannot exceed 30 characters" })
    .nonempty({ message: "Password is required" }),
});

export const emailScheme: ZodType<EmailData> = z.object({
  email: z.string().email({ message: "Enter a valid email address" }).nonempty({ message: "Email is required" }),
});

export const setNewPasswordSchema: ZodType<PasswordData> = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(30, { message: "Password cannot exceed 30 characters" })
      .nonempty({ message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters long" })
      .max(30, { message: "Confirm Password cannot exceed 30 characters" })
      .nonempty({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
