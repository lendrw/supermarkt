import { useState } from "react";
import { BaseLayout } from "../../shared/layouts";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../shared/services/api/auth/AuthService";
import { FormCard } from "../../shared/utils/formCard/FormCard";
import { FormButton } from "../../shared/utils/formButton/FormButton";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

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
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (values: IFormData) => {
    setError("");
    setSuccess("");

    try {
      const result = await AuthService.register(values.email, values.password);

      if (!(result instanceof Error)) {
        setSuccess("Account created successfully! Please log in.");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <BaseLayout className="flex flex-col items-center justify-center">
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={formValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormCard className="w-88 md:w-100 h-100 md:h-110">
              <h1 className="text-xl font-bold text-blue-900">Welcome :)</h1>
              <span className="text-blue-900">
                Please enter your user details to continue
              </span>

              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-600">{success}</p>}

              <div className="flex flex-col">
                <label htmlFor="email" className="text-blue-800 font-bold text-sm">Email</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="user@example.com"
                  autoComplete="email"
                  className="text-gray-600 border w-80 border-blue-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 p-1 rounded-lg bg-white text-center"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-blue-800 font-bold text-sm">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  className="text-gray-600 border w-80 border-blue-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 p-1 rounded-lg bg-white text-center"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-blue-800 font-bold text-sm">Confirm Password</label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className= "text-gray-600 border w-80 border-blue-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 p-1 rounded-lg bg-white text-center"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className="text-red-500 text-sm"
                />
              </div>

              <FormButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Account"}
              </FormButton>
            </FormCard>
          </Form>
        )}
      </Formik>
    </BaseLayout>
  );
};
