import { useAuthContext } from "../../shared/contexts";
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
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

export const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { formRef } = useVForm();

  const handleSubmit = async (data: IFormData) => {
    setError("");
    formRef.current?.setErrors({});

    try {
      const validatedData = await formValidationSchema.validate(data, {
        abortEarly: false,
      });

      const result = await AuthService.login(
        validatedData.email,
        validatedData.password
      );

      if (result instanceof Error) {
        setError(result.message);
      } else {
        localStorage.setItem("APP_ACCESS_TOKEN", result.accessToken);
        login(validatedData.email, validatedData.password);
        navigate("/");
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
      <VForm onSubmit={handleSubmit} ref={formRef}>
        <FormCard className="w-100 h-90">
          <h1 className="text-xl font-bold text-blue-900">Welcome :)</h1>
          <span className="text-blue-900">
            Please enter your login details to continue.
          </span>
          {error && <p className="text-red-500">{error}</p>}

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
              placeholder="Your password"
              label="Password"
              autoComplete="current-password"
            />
          </div>

          <FormButton type="submit">Login</FormButton>

          <span className="text-blue-900">
            New here? Click{" "}
            <span
              className="text-orange-500 cursor-pointer underline"
              onClick={() => navigate("/register")}
            >
              here
            </span>{" "}
            to create an account.
          </span>
        </FormCard>
      </VForm>
    </BaseLayout>
  );
};
