import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import RestaurantsList from './components/Restaurants'
import Rdetails from "./components/Rdetails"
import LocationSearch from './components/LocationSearch'
import ImageSearch from './components/ImageSearch'

const App = () => {
  return (
    <BrowserRouter>
      <div className="dark:bg-gray-900 dark:text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<RestaurantsList />} />
          <Route path="/restaurant/:id" element={<Rdetails />} />
          <Route path="/restaurants/location" element={<LocationSearch />} />
          <Route path="/restaurants/imgsearch" element={<ImageSearch />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
