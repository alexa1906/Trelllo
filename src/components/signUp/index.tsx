import { FormEvent, useState } from "react";
import api from "../../api/axios"; // Import your Axios instance
import "./signUp.css";
import axios from "axios";

interface SignupProps {
  onChangeToLogin: () => void;
  onSignupSuccess: (email: string) => void;
}

const Signup = ({ onChangeToLogin, onSignupSuccess }: SignupProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("/auth/register", {
        firstName,
        lastName,
        dateOfBirth,
        email,
        password,
        // mai lung de 6 caractere
      })
      .then((response) => {
        console.log(response);
        onSignupSuccess(email);
      })
      .catch((error) => {
        console.error("Signup failed:", error);
      });
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
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
