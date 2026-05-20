import { useNavigate } from "react-router-dom";

function Categories() {

  const navigate = useNavigate();

  const categories = [

    {
      name: "AI",
      emoji: "🤖",
      color: "from-pink-500 to-purple-500",
      description: "Artificial Intelligence & Machine Learning",
    },

    {
      name: "Programming",
      emoji: "💻",
      color: "from-blue-500 to-cyan-500",
      description: "Coding, React, JavaScript & Backend",
    },

    {
      name: "Movies",
      emoji: "🎬",
      color: "from-red-500 to-orange-500",
      description: "Hollywood, Bollywood & Cinema",
    },

    {
      name: "Sports",
      emoji: "⚽",
      color: "from-green-500 to-emerald-500",
      description: "Football, Cricket & More",
    },

    {
      name: "GK",
      emoji: "🌍",
      color: "from-yellow-500 to-orange-400",
      description: "General Knowledge & Current Affairs",
    },

  ];

  return (

    <div className="min-h-screen bg-gradient-to-r from-black via-purple-900 to-blue-900 text-white p-10">

      <h1 className="text-6xl font-extrabold text-center mb-4 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
        Choose Quiz Category
      </h1>

      <p className="text-center text-gray-300 text-xl mb-14">
        Select your favorite topic and test your knowledge 🚀
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {categories.map((category, index) => (

          <div
            key={index}
            className={`bg-gradient-to-r ${category.color} p-1 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300`}
          >

            <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-10 h-full">

              <div className="text-7xl mb-6 text-center animate-bounce">
                {category.emoji}
              </div>

              <h2 className="text-4xl font-extrabold text-center mb-4">
                {category.name}
              </h2>

              <p className="text-center text-gray-200 mb-8 text-lg">
                {category.description}
              </p>

              <button
                onClick={() =>
                  navigate(`/quiz/${category.name}`)
                }
                className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition"
              >
                Start Quiz
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Categories;