import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 8000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post('/routes/signup', {
        username,
        email,
        password,
      });

      localStorage.setItem("authToken", data.token);

      setTimeout(() => {
        navigate("/");
      }, 1800);
    } catch (error) {
      setError(error.response.data.error);

      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        margin: "0 auto",
        marginTop: "10%",
        maxWidth: "400px",
      }}
    >
      <h2 style={{ margin: "20px 0", fontSize: "24px" }}>Create Account</h2>
      <form
        style={{ margin: "20px 0", textAlign: "left" }}
        onSubmit={registerHandler}
      >
        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}

        <div style={{ margin: "10px 0" }}>
          <input
            type="text"
            required
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            placeholder="Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={{ margin: "10px 0" }}>
          <input
            type="email"
            required
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div style={{ margin: "10px 0" }}>
          <input
            type="password"
            required
            autoComplete="true"
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            placeholder="6+ strong characters"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div style={{ margin: "10px 0" }}>
          <input
            type="password"
            required
            autoComplete="true"
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "18px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
          }}
        >
          Register
        </button>
      </form>

      <div>
        <span>Already have an account? </span>
        <Link to="/login" style={{ color: "#007BFF", textDecoration: "none" }}>
          Login Here
        </Link>
      </div>
    </div>
  );
};

export default Signup;
