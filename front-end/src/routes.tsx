import { Routes, Route } from 'react-router-dom'

import MainPage from './pages/Main'
import Burgers from './pages/Main/Burgers'
import Pizzas from './pages/Main/Pizzas'
import Drinks from './pages/Main/Drinks'
import Desserts from './pages/Main/Desserts'
import MyCart from './pages/MyCard'
import Payment from './pages/Payment'
import OrderSuccessPage from './pages/Orders/Success'

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}>
        <Route path='/' element={<Burgers />} />
        <Route path='pizzas' element={<Pizzas />} />
        <Route path='drinks' element={<Drinks />} />
        <Route path='desserts' element={<Desserts />} />
      </Route>
      <Route path='cart' element={<MyCart />}/>
      <Route path='payment' element={<Payment />}/>
      <Route path='order'>
        <Route path='success/:orderId' element={<OrderSuccessPage />} />
      </Route>
    </Routes>
  )
}
