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

export const Login = () => {
  interface IFormData {
    email: string;
    password: string;
  }

  const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    email: yup.string().required("Email é obrigatório").email("Email inválido"),
    password: yup.string().required("Senha é obrigatória"),
  });

  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { formRef } = useVForm();

  const handleSubmit = async (dados: IFormData) => {
    setError("");
    formRef.current?.setErrors({});

    try {
      const dadosValidados = await formValidationSchema.validate(dados, {
        abortEarly: false,
      });

      const result = await AuthService.login(
        dadosValidados.email,
        dadosValidados.password
      );

      if (result instanceof Error) {
        setError(result.message);
      } else {
        localStorage.setItem("APP_ACCESS_TOKEN", result.accessToken);
        login(dadosValidados.email, dadosValidados.password);
        navigate("/");
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: IVFormErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
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
          <h1 className="text-xl font-bold text-blue-900">Welcome : )</h1>
          <span className="text-blue-900">
            Please enter your login details to continue
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
              placeholder="your password"
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
