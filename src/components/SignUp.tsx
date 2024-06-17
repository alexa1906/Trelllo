import { FormEvent, useState } from "react";

interface SignupProps {
  onChangeToLogin: () => void;
  onSignupSuccess: (email: string) => void;
}

const Signup = ({ onChangeToLogin, onSignupSuccess }: SignupProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mock signup logic, replace with real signup logic
    if (password === confirmPassword) {
      onSignupSuccess(email);
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={onChangeToLogin}>Login</button>
      </p>
    </div>
  );
};

export default Signup;
