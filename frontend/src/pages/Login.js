import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    const response = await fetch("http://localhost:5000/login", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),

    });

    const data = await response.json();

    if (response.ok) {

      localStorage.setItem("isLoggedIn", "true");

      alert(data.message);

      navigate("/categories");

    } else {

      alert(data.message);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-black via-purple-900 to-blue-900 flex items-center justify-center p-6">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-5xl font-extrabold text-center mb-3 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
          Welcome Back
        </h1>

        <p className="text-center text-gray-300 mb-10 text-lg">
          Login to continue your quiz journey 🚀
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-5 rounded-2xl bg-black/30 text-white outline-none border border-white/10"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-7 rounded-2xl bg-black/30 text-white outline-none border border-white/10"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:scale-105 transition-all duration-300 text-white p-4 rounded-2xl text-xl font-bold shadow-xl"
        >
          Login
        </button>

        <p className="text-gray-300 text-center mt-8 text-lg">

          Don’t have an account?

          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 cursor-pointer ml-2 font-semibold"
          >
            Register
          </span>

        </p>

      </div>

    </div>

  );

}

export default Login;