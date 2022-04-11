import React from 'react';
import MainPage from './pages/MainPage'
import Restaurant from './pages/RestaurantPage'
import NotFound from "./components/notFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/restaurant/:coordinates" element={<Restaurant />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
