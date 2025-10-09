import { useAuthContext } from "../../shared/contexts";
import { useState } from "react";
import { BaseLayout } from "../../shared/layouts";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../shared/services/api/auth/AuthService";
import { FormCard } from "../../shared/utils/formCard/FormCard";
import { FormButton } from "../../shared/utils/formButton/FormButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

export interface IFormData {
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

  const handleSubmit = async (values: IFormData) => {
    setError("");

    try {
      const result = await AuthService.login(values.email, values.password);

      if (result instanceof Error) {
        setError(result.message);
      } else {
        localStorage.setItem("APP_ACCESS_TOKEN", result.accessToken);
        login(result);
        navigate("/");
      }
    } catch (err) {
      setError("Unexpected error. Please try again.");
    }
  };

  return (
    <BaseLayout className="flex flex-col items-center justify-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={formValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full flex items-center justify-center">
            <FormCard className="w-88 md:w-100 h-90 flex items-center justify-center">
              <h1 className="text-xl font-bold text-blue-900">Welcome :)</h1>
              <span className="text-blue-900">
                Please enter your login details to continue.
              </span>

              {error && <p className="text-red-500">{error}</p>}

              <div className="flex flex-col">
                <label htmlFor="email" className="text-blue-800 font-bold text-sm">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="user@example.com"
                  autoComplete="email"
                  className="text-gray-600 border w-80 border-blue-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 p-1 rounded-lg bg-white text-center"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-blue-800 font-bold text-sm">Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Your password"
                  autoComplete="current-password"
                  className="text-gray-600 border w-80 border-blue-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 p-1 rounded-lg bg-white text-center"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <FormButton
                type="submit"
                data-testid="login-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </FormButton>

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
          </Form>
        )}
      </Formik>
    </BaseLayout>
  );
};
