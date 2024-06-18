import { FormEvent, useState } from "react";
import axios from "../../api/axios";
// import axios from "axios";


interface LoginProps {
  onChangeToSignup: () => void;
  onLoginSuccess: (email: string) => void;
}

const Login = ({ onChangeToSignup, onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("/auth/login", {
        email,
        password,
      })
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        onLoginSuccess(email);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={onChangeToSignup}>Sign Up</button>
      </p>
    </div>
  );
};

export default Login;
