import { useState } from "react";
import { BaseLayout } from "../../shared/layouts";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../shared/services/api/auth/AuthService";
import { FormCard } from "../../shared/utils/formCard/FormCard";
import { FormButton } from "../../shared/utils/formButton/FormButton";
import { VTextField, VForm, useVForm } from "../../shared/forms";
import type { IVFormErrors } from "../../shared/forms";
import * as yup from "yup";

interface IFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const Register = () => {
  const { formRef } = useVForm();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (data: IFormData) => {
    setError("");
    setSuccess("");
    formRef.current?.setErrors({});

    try {
      const validatedData = await formValidationSchema.validate(data, {
        abortEarly: false,
      });

      const result = await AuthService.register(
        validatedData.email,
        validatedData.password
      );

      if (!(result instanceof Error)) {
        console.log("Registration success, will redirect in 3s");
        setSuccess("Account created successfully! Please log in.");
        setTimeout(() => {
          console.log("Redirecting now...");
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: IVFormErrors = {};
        err.inner.forEach((validationError) => {
          if (validationError.path) {
            validationErrors[validationError.path] = validationError.message;
          }
        });
        formRef.current?.setErrors(validationErrors);
      }
    }
  };

  return (
    <BaseLayout className="flex flex-col items-center justify-center">
      <VForm
        onSubmit={handleSubmit}
        ref={formRef}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <FormCard className="w-88 md:w-100 h-100 md:h-110">
          <h1 className="text-xl font-bold text-blue-900">Welcome :)</h1>
          <span className="text-blue-900">
            Please enter your user details to continue
          </span>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <div className="flex flex-col">
            <VTextField
              name="email"
              type="email"
              placeholder="user@example.com"
              label="Email"
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col">
            <VTextField
              name="password"
              type="password"
              label="Password"
              autoComplete="new-password"
            />
          </div>

          <div className="flex flex-col">
            <VTextField
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              autoComplete="new-password"
            />
          </div>

          <FormButton type="submit">Create Account</FormButton>
        </FormCard>
      </VForm>
    </BaseLayout>
  );
};
