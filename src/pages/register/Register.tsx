import { useAuthContext } from "../../shared/contexts";
import { useState } from "react";
import { BaseLayout } from "../../shared/layouts";
import { useNavigate } from "react-router-dom"; // <- importado aqui
import { GenericInput } from "../../shared/components";
import { AuthService } from "../../shared/services/api/auth/AuthService";
import { FormCard } from "../../shared/utils/formCard/FormCard";
import { FormButton } from "../../shared/utils/formButton/FormButton";

export const Register = () => {
  const { login } = useAuthContext();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await AuthService.login(email, password);

    if (result instanceof Error) {
      setError(result.message);
    } else {
      localStorage.setItem("APP_ACCESS_TOKEN", result.accessToken);

      login(email, password);

      navigate("/");
    }
  };

  return (
    <BaseLayout className="flex flex-col items-center justify-center">
      <FormCard onSubmit={handleSubmit} className="w-100 h-110">
        <h1 className="text-xl font-bold text-blue-900">Welcome : )</h1>
        <span className="text-blue-900">
          Please enter your user details to continue
        </span>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col">
          <span className="text-blue-800 font-bold text-sm">Email</span>
          <GenericInput
            placeholder="user@example.com"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-blue-800 font-bold text-sm">Password</span>
          <GenericInput
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-blue-800 font-bold text-sm">Confirm password</span>
          <GenericInput
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <FormButton type="submit">Create account</FormButton>
      </FormCard>
    </BaseLayout>
  );
};
