const { z } = require("zod");

const hossignupSchema = z.object({
    hospitalName: z
        .string({ required_error: "Hospital Name is required" })
        .trim()
        .min(3, { message: "Hospital Name must be at least 3 characters." })
        .max(255, { message: "Hospital Name must not be more than 255 characters." }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 characters." })
        .max(255, { message: "Email must not be more than 255 characters." }),

    address: z
        .string({ required_error: "Address is required" })
        .trim()
        .min(5, { message: "Address must be at least 5 characters long." })
        .max(500, { message: "Address must not be more than 500 characters." }),

    contact: z
        .string({ required_error: "Phone number is required" })
        .trim()
        .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." })
        .min(10, { message: "Phone number must be exactly 10 digits." })
        .max(10, { message: "Phone number must be exactly 10 digits." }),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(7, { message: "Password must be at least 7 characters." })
        .max(1024, { message: "Password must not be more than 1024 characters." })
});

module.exports = hossignupSchema;
