import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";


const App: React.FC = () => {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="room" element={<RoomPage />} />
      </Route>
    </Routes>
    </>
  );
};

export default App;
