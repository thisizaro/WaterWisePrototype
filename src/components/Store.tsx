"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Droplet,
  Sun,
  Moon,
  Award,
  Zap,
  Feather,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { toast } from "@/components/ui/use-toast";
import { useToast } from "@/hooks/use-toast";

const storeItems = [
  {
    id: 1,
    name: "Super Soaker",
    description: "Doubles your water-saving efficiency for 24 hours",
    cost: 500,
    icon: Zap,
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
  },
  {
    id: 2,
    name: "Green Thumb",
    description: "Plant virtual trees that generate 10 points per hour",
    cost: 1000,
    icon: Feather,
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
  },
  {
    id: 3,
    name: "Rainmaker",
    description: "Summon a rainstorm to instantly complete a task",
    cost: 1500,
    icon: Droplet,
    color: "bg-indigo-500",
    hoverColor: "hover:bg-indigo-600",
  },
  {
    id: 4,
    name: "Eco Influencer",
    description: "Your actions inspire others, earning 2x points for a week",
    cost: 2000,
    icon: Sparkles,
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
  },
  {
    id: 5,
    name: "Water Wizard Wand",
    description: "Cast water-saving spells to automate daily tasks",
    cost: 3000,
    icon: Award,
    color: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-600",
  },
];

export default function Store({
  points = 5000,
  onPurchase = (item) => console.log("Purchased:", item),
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handlePurchase = (item) => {
    if (points >= item.cost) {
      onPurchase(item);
      toast({
        title: "Purchase Successful!",
        description: `You've acquired the ${item.name}!`,
        duration: 3000,
        className: "bg-green-500 text-white dark:bg-green-600",
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: "You don't have enough points for this item.",
        variant: "destructive",
        duration: 3000,
        className: "bg-red-500 text-white dark:bg-red-600",
      });
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark" : ""
      } bg-gradient-to-b from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 transition-colors duration-300`}
    >
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center sticky top-0 z-10 transition-colors duration-300">
        <motion.h1
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          WaterWise Store
        </motion.h1>
        <div className="flex items-center space-x-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center"
          >
            <Droplet className="inline-block mr-2" />
            {points}
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full transition-colors duration-300"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 mt-8">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Upgrade Your Water-Saving Powers!
        </motion.h2>

        <ScrollArea className="h-[calc(100vh-250px)]">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {storeItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader
                    className={`${item.color} text-white transition-colors duration-300 ${item.hoverColor}`}
                  >
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-2xl">{item.name}</CardTitle>
                      <item.icon className="w-8 h-8" />
                    </div>
                  </CardHeader>
                  <CardContent className="mt-4">
                    <CardDescription className="dark:text-gray-300">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center">
                      <Droplet className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
                      <span className="font-bold dark:text-gray-200">
                        {item.cost}
                      </span>
                    </div>
                    <Button
                      onClick={() => handlePurchase(item)}
                      className={`${item.color} ${item.hoverColor} text-white transition-colors duration-300`}
                    >
                      Purchase
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-md p-4 text-center mt-8 transition-colors duration-300">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Upgrade your water-saving abilities and make a bigger impact!
        </p>
      </footer>
    </div>
  );
}
