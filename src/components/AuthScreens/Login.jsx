import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/routes/login', { email, password });
      localStorage.setItem("authToken", data.token);

      setTimeout(() => {
        navigate("/");
      }, 1800);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 4500);
    }
  };

  return (
    <div
      style={{ textAlign: "center", margin: "auto", marginTop: "10%", maxWidth: "400px" }}
      className="logincss"
    >
      <div className="login1">
        <h2>Login to Your Account</h2>
      </div>

      <form
        onSubmit={loginHandler}
        style={{ margin: "20px 0", textAlign: "left" }}
        className="my-4 mx-3"
      >
        {error && (
          <div
            style={{ color: "red", marginBottom: "10px" }}
            className="error_message"
          >
            {error}
          </div>
        )}

        <div style={{ margin: "10px 0" }} className="form-group">
          <input
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            className="form-control inputcss"
            type="email"
            required
            id="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>

        <div style={{ margin: "10px 0" }} className="form-group">
          <input
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            className="form-control inputcss"
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="6+ strong characters"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>

        <div
          style={{
            margin: "20px 0",
            display: "flex",
            justifyContent: "center",
          }}
          className="container"
        >
          <button
            type="submit"
            style={{
              width: "50%",
              padding: "10px",
              fontSize: "18px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
            }}
            className="btn btn-primary my-3 loginbtn"
          >
            Login
          </button>
        </div>

        <div className="top-suggest_register">
          <span>Dont have an account? </span>
          <Link
            to="/signup"
            style={{ color: "#007BFF", textDecoration: "none" }}
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;