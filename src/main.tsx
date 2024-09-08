import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import FeedPage from "./components/FeedPage.tsx";
import Layout from "./Layout.tsx";
import Leaderboard from "./components/Leaderboard.tsx";
import MiniGame from "./components/MiniGame.tsx";
import Store from "./components/Store.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="" element={<FeedPage />} />
      <Route path="leaderboard" element={<Leaderboard />} />
      <Route path="minigame" element={<MiniGame />} />
      <Route path="store" element={<Store />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
