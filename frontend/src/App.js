import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import Categories from "./pages/Categories";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/quiz/:category" element={<Quiz />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;