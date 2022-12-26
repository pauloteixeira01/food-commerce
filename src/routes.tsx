import { Routes, Route } from 'react-router-dom'

import MainPage from './pages/Main'
import Burgers from './pages/Main/Burgers'
import Pizzas from './pages/Main/Pizzas'
import Drinks from './pages/Main/Drinks'
import Desserts from './pages/Main/Desserts'

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}>
        <Route path='/' element={<Burgers />} />
        <Route path='/pizzas' element={<Pizzas />} />
        <Route path='/drinks' element={<Drinks />} />
        <Route path='/desserts' element={<Desserts />} />
      </Route>
    </Routes>
  )
}
