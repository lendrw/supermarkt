import { useAuth } from "../../shared/contexts/AuthContext";
import { useState } from "react";
import { BaseLayout } from "../../shared/layouts";
import { useNavigate } from "react-router-dom"; // <- importado aqui

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // <- hook para navegação
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });
      navigate("/"); // <- redireciona após login com sucesso
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <BaseLayout>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Entrar
        </button>
      </form>
    </BaseLayout>
  );
};
