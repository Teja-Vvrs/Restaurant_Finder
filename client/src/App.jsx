import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import RestaurantsList from './components/Restaurants'
import Rdetails from "./components/Rdetails"
import LocationSearch from './components/LocationSearch'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/restaurants" element={<RestaurantsList/>} />
      <Route path="/restaurant/:id" element={<Rdetails />} />
     <Route path="/restaurants/location" element={<LocationSearch />} />
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
