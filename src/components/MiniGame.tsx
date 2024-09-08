"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Droplet, Home, Trophy } from "lucide-react";

const cityStages = [
  { name: "Dry City", image: "/placeholder.svg?height=200&width=300" },
  { name: "Improving City", image: "/placeholder.svg?height=200&width=300" },
  { name: "Thriving City", image: "/placeholder.svg?height=200&width=300" },
];

const tasks = [
  {
    id: 1,
    type: "decision",
    text: "The city's water supply is running low. What's your first move?",
    options: [
      {
        text: "Implement water rationing",
        points: 100,
        effect: "Residents are cautious but hopeful.",
      },
      {
        text: "Invest in water recycling technology",
        points: 150,
        effect: "A long-term solution that will take time to implement.",
      },
      {
        text: "Launch a water conservation campaign",
        points: 75,
        effect: "Awareness increases, but immediate impact is limited.",
      },
    ],
  },
  {
    id: 2,
    type: "action",
    text: "A water main has burst! Use your super speed to fix it quickly!",
    action: "Tap rapidly",
    points: 100,
    effect: "You've prevented massive water loss and gained the city's trust!",
  },
  {
    id: 3,
    type: "build",
    text: "It's time to build a water treatment plant. Where will you place it?",
    options: [
      {
        text: "Near the river",
        points: 200,
        effect: "Easy access to water, but might affect local ecosystem.",
      },
      {
        text: "In the industrial zone",
        points: 150,
        effect: "Efficient for factories, but farther from residential areas.",
      },
      {
        text: "Underground facility",
        points: 250,
        effect: "Costly, but preserves land and is protected from disasters.",
      },
    ],
  },
  // Add more varied tasks here...
];

const WaterHero = ({ isDarkMode }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
    className={`w-20 h-20 rounded-full ${
      isDarkMode ? "bg-blue-600" : "bg-blue-400"
    } flex items-center justify-center`}
  >
    <Droplet size={40} className="text-white" />
  </motion.div>
);

const SpeechBubble = ({ text, onComplete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg max-w-md mx-auto mb-4 relative"
  >
    <p className="text-gray-800 dark:text-gray-200">{text}</p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onComplete}
      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      Continue
    </motion.button>
    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-solid border-white dark:border-gray-800 border-b-0"></div>
  </motion.div>
);

export default function MiniGame() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [points, setPoints] = useState(0);
  const [currentTask, setCurrentTask] = useState(null);
  const [gameStage, setGameStage] = useState("intro");
  const [cityStage, setCityStage] = useState(0);
  const [dialogue, setDialogue] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleTaskCompletion = (taskPoints) => {
    setPoints((prevPoints) => {
      const newPoints = prevPoints + taskPoints;
      if (newPoints >= 1000 && cityStage === 0) {
        setCityStage(1);
        setDialogue(
          "Great job! The city is showing signs of improvement. Keep up the good work!"
        );
      } else if (newPoints >= 2500 && cityStage === 1) {
        setCityStage(2);
        setDialogue(
          "Amazing progress! The city is thriving thanks to your efforts!"
        );
      } else if (newPoints >= 3000) {
        setGameStage("victory");
      }
      return newPoints;
    });
    setCurrentTask(null);
    if (gameStage !== "victory") {
      setDialogue("Well done! Let's move on to the next challenge.");
    }
  };

  const startGame = () => {
    setGameStage("playing");
    setDialogue(
      "Welcome to Dry City! I'm so glad you're here to help. Let's get started on saving our water!"
    );
  };

  const nextTask = () => {
    setDialogue(null);
    if (gameStage === "playing") {
      setCurrentTask(tasks[Math.floor(Math.random() * tasks.length)]);
    }
  };

  useEffect(() => {
    if (gameStage === "intro") {
      setDialogue(
        "Hello, Water Hero! Our city is in dire need of your help. Will you accept the challenge to save our water supply?"
      );
    }
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark" : ""
      } bg-gradient-to-b from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900`}
    >
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          WaterWise MiniGame
        </h1>
        <div className="flex items-center space-x-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-xl font-bold text-blue-600 dark:text-blue-400"
          >
            {points} / 3000
          </motion.div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 mt-8">
        <div className="flex justify-center mb-8">
          <WaterHero isDarkMode={isDarkMode} />
        </div>

        <motion.div
          key={cityStages[cityStage].name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <img
            src={cityStages[cityStage].image}
            alt={cityStages[cityStage].name}
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
          <h2 className="text-center mt-2 text-xl font-bold text-gray-800 dark:text-gray-200">
            {cityStages[cityStage].name}
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {dialogue && (
            <SpeechBubble
              key="dialogue"
              text={dialogue}
              onComplete={nextTask}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {currentTask && (
            <motion.div
              key={currentTask.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                {currentTask.text}
              </h2>
              {currentTask.type === "decision" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentTask.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleTaskCompletion(option.points);
                        setDialogue(option.effect);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      {option.text}
                    </motion.button>
                  ))}
                </div>
              )}
              {currentTask.type === "action" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleTaskCompletion(currentTask.points);
                    setDialogue(currentTask.effect);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  {currentTask.action}
                </motion.button>
              )}
              {currentTask.type === "build" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentTask.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleTaskCompletion(option.points);
                        setDialogue(option.effect);
                      }}
                      className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
                    >
                      {option.text}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {gameStage === "intro" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-auto block"
          >
            Accept the Challenge
          </motion.button>
        )}

        {gameStage === "victory" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Congratulations!
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-200">
              You've restored the city's water conditions!
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Share your achievement on the main feed!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                /* Navigate to main feed */
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Share Achievement
            </motion.button>
          </motion.div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex justify-around items-center p-4 max-w-4xl mx-auto">
          {[
            { icon: Home, name: "Home" },
            { icon: Droplet, name: "Game" },
            { icon: Trophy, name: "Leaderboard" },
          ].map(({ icon: Icon, name }) => (
            <div key={name} className="group relative">
              <button className="text-gray-600 dark:text-gray-400 p-2">
                <Icon className="h-6 w-6" />
              </button>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {name}
              </span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
