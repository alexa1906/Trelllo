import { FormEvent, useState } from "react";

interface LoginProps {
  onChangeToSignup: () => void;
  onLoginSuccess: (email: string) => void; 
}

const Login = ({ onChangeToSignup, onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mock login logic, replace with real authentication logic
    if (email === "user@example.com" && password === "123") {
      onLoginSuccess(email); // Pass email to onLoginSuccess
    } else {
      console.log("Invalid credentials");
    }
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
