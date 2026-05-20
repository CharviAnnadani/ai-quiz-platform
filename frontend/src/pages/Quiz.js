import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Quiz() {

  const navigate = useNavigate();

  const { category } = useParams();

  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState("");

  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const [score, setScore] = useState(0);

  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/");
    }

    fetch(`http://localhost:5000/quiz/${category}`)
      .then((res) => res.json())
      .then((data) => setQuizzes(data));

  }, [navigate, category]);


  // TIMER

  useEffect(() => {

    if (answered) return;

    if (timeLeft === 0) {

      setAnswered(true);

      setResult("⏰ Time's Up!");

      return;

    }

    const timer = setInterval(() => {

      setTimeLeft((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft, answered]);


  const checkAnswer = (option, correctAnswer) => {

    if (answered) return;

    setSelectedAnswer(option);
    setAnswered(true);

    if (option === correctAnswer) {

      setResult("✅ Correct Answer");
      setIsCorrect(true);

      setScore(score + 1);

    } else {

      setResult("❌ Wrong Answer");
      setIsCorrect(false);

    }

  };

  const nextQuestion = () => {

    setCurrentQuestion(currentQuestion + 1);

    setSelectedAnswer("");
    setResult("");

    setAnswered(false);
    setIsCorrect(null);

    setTimeLeft(15);

  };

  const restartQuiz = () => {

    setCurrentQuestion(0);

    setSelectedAnswer("");
    setResult("");

    setAnswered(false);
    setIsCorrect(null);

    setScore(0);

    setTimeLeft(15);

  };

  const logout = () => {

    localStorage.removeItem("isLoggedIn");

    navigate("/");

  };

  if (quizzes.length === 0) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-4xl font-bold">
        Loading...
      </div>
    );

  }

  if (currentQuestion >= quizzes.length) {

    return (

      <div className="min-h-screen bg-gradient-to-r from-black via-purple-900 to-blue-900 text-white flex items-center justify-center p-10">

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-12 rounded-3xl shadow-2xl text-center w-full max-w-2xl">

          <h1 className="text-6xl font-extrabold mb-6">
            {category} Quiz Completed 🎉
          </h1>

          <p className="text-4xl mb-8 font-bold">
            Your Score: {score} / {quizzes.length}
          </p>

          <div className="flex justify-center gap-6 flex-wrap">

            <button
              onClick={restartQuiz}
              className="bg-blue-500 hover:bg-blue-600 transition px-8 py-4 rounded-2xl text-xl font-bold shadow-xl"
            >
              Restart Quiz
            </button>

            <button
              onClick={() => navigate("/categories")}
              className="bg-purple-500 hover:bg-purple-600 transition px-8 py-4 rounded-2xl text-xl font-bold shadow-xl"
            >
              Categories
            </button>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 transition px-8 py-4 rounded-2xl text-xl font-bold shadow-xl"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    );

  }

  const quiz = quizzes[currentQuestion];

  return (

    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-black to-blue-900 text-white p-10">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-3xl flex justify-between items-center mb-10 shadow-2xl">

        <div>

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
            {category} Quiz
          </h1>

          <p className="text-gray-300 mt-2 text-lg">
            Test your knowledge with smart quizzes 🚀
          </p>

        </div>

        <div className="flex items-center gap-4 flex-wrap">

          <div className="bg-black/30 px-5 py-3 rounded-2xl">

            <h2 className="text-xl font-bold">
              Score: {score}
            </h2>

          </div>

          <div className="bg-red-500 px-5 py-3 rounded-2xl shadow-lg">

            <h2 className="text-xl font-bold">
              ⏰ {timeLeft}s
            </h2>

          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-2xl font-semibold shadow-lg"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto">

        <div className="flex justify-between mb-6">

          <h2 className="text-2xl font-bold text-pink-300">
            Question {currentQuestion + 1}
          </h2>

          <h2 className="text-2xl font-bold text-blue-300">
            Total: {quizzes.length}
          </h2>

        </div>

        <div className="w-full bg-gray-700 rounded-full h-4 mb-8 overflow-hidden">

          <div
            className="bg-gradient-to-r from-pink-500 to-blue-500 h-4 rounded-full transition-all duration-500"
            style={{
              width: `${((currentQuestion + 1) / quizzes.length) * 100}%`,
            }}
          ></div>

        </div>

        <h2 className="text-4xl font-bold mb-10 leading-relaxed">
          {quiz.question}
        </h2>

        <div className="grid gap-5">

          {quiz.options.map((option, i) => (

            <button
              key={i}
              onClick={() =>
                checkAnswer(option, quiz.correctAnswer)
              }
              disabled={answered}
              className={`p-5 rounded-2xl text-left transition-all duration-300 text-xl font-semibold shadow-lg
              ${
                selectedAnswer === option
                ? isCorrect
                  ? "bg-green-500 scale-105"
                  : "bg-red-500 scale-105"
                : "bg-purple-600 hover:bg-purple-700 hover:scale-105"
              }`}
            >
              {option}
            </button>

          ))}

        </div>

        <p className="mt-8 text-3xl font-bold text-center">
          {result}
        </p>

        {answered && (

          <div className="flex justify-center">

            <button
              onClick={nextQuestion}
              className="mt-8 bg-blue-500 hover:bg-blue-600 transition px-8 py-4 rounded-2xl text-xl font-bold shadow-xl"
            >
              Next Question →
            </button>

          </div>

        )}

      </div>

    </div>

  );

}

export default Quiz;