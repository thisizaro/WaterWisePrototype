"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Crown } from "lucide-react";

const leaderboardData = [
  { id: 1, username: "water_savior", points: 1200 },
  { id: 2, username: "eco_warrior", points: 1150 },
  { id: 3, username: "green_thumb", points: 1100 },
  { id: 4, username: "river_guardian", points: 1050 },
  { id: 5, username: "earth_protector", points: 1000 },
  { id: 6, username: "sustainability_champ", points: 950 },
  { id: 7, username: "ocean_advocate", points: 900 },
  { id: 8, username: "forest_keeper", points: 850 },
  { id: 9, username: "climate_hero", points: 800 },
  { id: 10, username: "eco_innovator", points: 750 },
];

const MedalIcon = ({ color }) => (
  <svg className={`w-8 h-8 ${color}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7.5l1.5 3 3.5.5-2.5 2.5.5 3.5L12 15l-3 1.5.5-3.5L7 10.5l3.5-.5L12 7.5z" />
    <path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
  </svg>
);

const getInitials = (username: string) => {
  return username
    .split("_")
    .map((word) => word[0].toUpperCase())
    .join("");
};

export default function Leaderboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [first, second, third, ...rest] = leaderboardData;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-gray-100 dark:bg-gray-900 p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Leaderboard
          </h1>
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

        <div className="flex justify-center items-end mb-8 space-x-4">
          {/* Second Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
            style={{ marginTop: "40px" }}
          >
            <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-full mb-2 flex items-center justify-center overflow-hidden">
              <img
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${getInitials(
                  second.username
                )}`}
                alt={second.username}
                className="w-full h-full"
              />
            </div>
            <MedalIcon color="text-gray-400" />
            <p className="text-sm mt-1 dark:text-gray-200">{second.username}</p>
            <p className="text-xs font-bold dark:text-gray-300">
              {second.points} pts
            </p>
          </motion.div>

          {/* First Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <Crown className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 text-yellow-400" />
              <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full mb-2 flex items-center justify-center overflow-hidden">
                <img
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${getInitials(
                    first.username
                  )}`}
                  alt={first.username}
                  className="w-full h-full"
                />
              </div>
            </div>
            <MedalIcon color="text-yellow-400" />
            <p className="text-sm mt-1 dark:text-gray-200">{first.username}</p>
            <p className="text-xs font-bold dark:text-gray-300">
              {first.points} pts
            </p>
          </motion.div>

          {/* Third Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center"
            style={{ marginTop: "60px" }}
          >
            <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-full mb-2 flex items-center justify-center overflow-hidden">
              <img
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${getInitials(
                  third.username
                )}`}
                alt={third.username}
                className="w-full h-full"
              />
            </div>
            <MedalIcon color="text-orange-400" />
            <p className="text-sm mt-1 dark:text-gray-200">{third.username}</p>
            <p className="text-xs font-bold dark:text-gray-300">
              {third.points} pts
            </p>
          </motion.div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-gray-200">
            Leaderboard List
          </h2>
          {rest.slice(0, showAll ? rest.length : 3).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between py-2 border-b last:border-b-0 dark:border-gray-700"
            >
              <div className="flex items-center">
                <span className="text-lg font-bold mr-4 dark:text-gray-200">
                  {index + 4}
                </span>
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full mr-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${getInitials(
                      user.username
                    )}`}
                    alt={user.username}
                    className="w-full h-full"
                  />
                </div>
                <span className="dark:text-gray-200">{user.username}</span>
              </div>
              <span className="font-bold dark:text-gray-300">
                {user.points} pts
              </span>
            </motion.div>
          ))}
          {!showAll && rest.length > 3 && (
            <button
              onClick={() => setShowAll(true)}
              className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
