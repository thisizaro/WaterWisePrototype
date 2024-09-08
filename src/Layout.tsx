// import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Trophy, Gamepad2, ShoppingCart, Newspaper } from "lucide-react";

const Layout = () => {
  return (
    <>
      <Outlet />
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex justify-around items-center p-4 max-w-4xl mx-auto">
          {[
            { icon: ShoppingCart, name: "Store", to: "/store" },
            { icon: Trophy, name: "Leaderboard", to: "/leaderboard" },
            { icon: Gamepad2, name: "Minigame", to: "/minigame" },
            { icon: Newspaper, name: "Feed", to: "/" },
          ].map(({ icon: Icon, name, to }) => (
            <div key={name} className="group relative">
              <Link to={to}>
                <button className="text-gray-600 dark:text-gray-400 p-2">
                  <Icon className="h-6 w-6" />
                </button>
              </Link>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {name}
              </span>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Layout;
