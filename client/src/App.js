import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories/:category" element={<CategoriesPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
