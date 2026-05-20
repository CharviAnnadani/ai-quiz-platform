import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    const response = await fetch("http://localhost:5000/register", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),

    });

    const data = await response.json();

    if (response.ok) {

      alert(data.message);

      navigate("/");

    } else {

      alert(data.message);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-black via-purple-900 to-blue-900 flex items-center justify-center p-6">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-5xl font-extrabold text-center mb-3 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
          Create Account
        </h1>

        <p className="text-center text-gray-300 mb-10 text-lg">
          Join the AI Quiz Platform 🚀
        </p>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 mb-5 rounded-2xl bg-black/30 text-white outline-none border border-white/10"
        />

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
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:scale-105 transition-all duration-300 text-white p-4 rounded-2xl text-xl font-bold shadow-xl"
        >
          Register
        </button>

        <p className="text-gray-300 text-center mt-8 text-lg">

          Already have an account?

          <span
            onClick={() => navigate("/")}
            className="text-blue-400 cursor-pointer ml-2 font-semibold"
          >
            Login
          </span>

        </p>

      </div>

    </div>

  );

}

export default Register;