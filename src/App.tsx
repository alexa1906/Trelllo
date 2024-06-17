import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  BrowserRouter,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Board from "./components/Board";
import "./App.css";
import BoardList from "./components/BoardList";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    navigate("/signup");
  };

  const handleSuccess = (email: string) => {
    setIsAuthenticated(true);
    const username = email.split("@")[0];
    navigate("/boards", { state: { username } });
  };

  return (
    <Routes>
      {/* {isAuthenticated ? ( */}
        <>
          <Route path="/boards" element={<BoardList />} />
          <Route path="/board/:boardId" element={<Board />} />
        </>
      {/* ) : isLogin ? ( */}
        <Route
          path="/"
          element={
            <Login
              onChangeToSignup={toggleAuthMode}
              onLoginSuccess={handleSuccess}
            />
          }
        />
      {/* ) : ( */}
        <Route
          path="/signup"
          element={
            <Signup
              onChangeToLogin={() => setIsLogin(true)}
              onSignupSuccess={handleSuccess}
            />
          }
        />
      {/* )} */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
export default App;
