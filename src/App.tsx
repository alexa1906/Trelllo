import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  BrowserRouter,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signUp";
import Board from "./components/board";
import "./App.css";
import BoardList from "./components/boardList";

const AppRoutes = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    navigate("/signup");
  };

  const handleSuccess = (email: string) => {
    const username = email.split("@")[0];
    navigate("/boards", { state: { username } });
  };

  const ProtectedRoute = ({ redirectPath = "/" }) => {
    if (!localStorage.getItem("accessToken")) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <>
          <Route path="/boards" element={<BoardList />} />
          <Route path="/board/:boardId" element={<Board />} />
        </>
      </Route>
      <Route
        path="/"
        element={
          <Login
            onChangeToSignup={toggleAuthMode}
            onLoginSuccess={handleSuccess}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <Signup
            onChangeToLogin={() => setIsLogin(true)}
            onSignupSuccess={handleSuccess}
          />
        }
      />

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
