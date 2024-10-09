import { number, object, ObjectSchema, string } from "yup";

import { GenderEnum } from "../../types/users-profile.interface";
import { User } from "../../types/users.interface";

export const userFormValidationSchema: ObjectSchema<
  Omit<User, "id" | "createdAt" | "updatedAt">
> = object()
  .shape({
    first_name: string()
      .required("First name is required")
      .matches(/^[a-zA-Z\s]+$/, "Name must only contain letters"),
    last_name: string()
      .required("Last name is required")
      .matches(/^[a-zA-Z\s]+$/, "Name must only contain letters"),
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
    profile: object()
      .shape({
        gender: string()
          .oneOf(Object.values(GenderEnum), "Select a valid gender")
          .required("Gender is required"),
        age: number()
          .typeError("Age must be a number")
          .min(18, "Age must be at least 18")
          .max(80, "Age must be at most 80")
          .required("Age is required"),
        height: number()
          .typeError("Height must be a number")
          .min(110, "Height must be at least 1")
          .max(250, "Height must be at most 250")
          .positive("Height must be a positive number")
          .required("Height is required"),
        weight: number()
          .typeError("Weight must be a number")
          .positive("Weight must be a positive number")
          .required("Weight is required"),
      })
      .required(),
  })
  .required();
