import {createContext, ReactNode, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import { SnackData } from '../interfaces/SnackData';
import {snackEmoji} from '../helpers/snackEmoji'
import { CustomerData } from '../interfaces/CustomerData';
import { Snack } from '../interfaces/Snack';
import { processCheckout } from '../services/api';


interface CartContextProps {
  cart: Snack[]
  addSnackIntoCart: (snack: SnackData) => void
  removeSnackFromCart: (snack: Snack) => void
  snackCartIncrement: (snack: Snack) => void
  snackCartDecrement: (snack: Snack) => void
  confirmOrder: () => void
  payOrder: (customer: CustomerData) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)


export function CartProvider({children}: CartProviderProps) {
  const key = `${process.env.REACT_APP_API_LOCAL_STORAGE_KEY}`
  const navigate = useNavigate()
  const [cart, setCart] = useState<Snack[]>(() => {
    const value = localStorage.getItem(key)

    if(value) return JSON.parse(value)

    return []
  })
  
  function saveCart(items: Snack[]) {
    setCart(items)
    localStorage.setItem(key, JSON.stringify(items))
  }

  function clearCart() {
    localStorage.removeItem(key)
  }

  function addSnackIntoCart(snack: SnackData): void {
    const snackExistentInCart = cart.find(item => item.snack === snack.snack && item.id === snack.id)

    const messageUpdate = snack.snack === 'burger' 
      ? `Outro ${snackEmoji(snack.snack)} ${snack.name} adicionado ao pedido.` 
      : `Outra ${snackEmoji(snack.snack)} ${snack.name} adicionada ao pedido.`
    
    const messageAdd = snack.snack === 'burger' 
      ? `${snackEmoji(snack.snack)} ${snack.name} adicionado ao pedido.` 
      : `${snackEmoji(snack.snack)} ${snack.name} adicionada ao pedido.`
    
    if(snackExistentInCart){
      const newCart = cart.map((item) => {
        if(item.id === snack.id) {
          const quantity = item.quantity + 1
          const subtotal = item.price * quantity

          return {...item, quantity, subtotal}
        }
        return item
      })
      toast.success(messageUpdate)
      saveCart(newCart)
      return
    }

    const newSnack = {...snack, quantity: 1, subtotal: snack.price}
    const newCart = [...cart, newSnack]
    toast.success(messageAdd)
    saveCart(newCart)
  }

  function removeSnackFromCart(snack: Snack) {
    const newCart = cart.filter(item => !(item.id === snack.id && item.snack === snack.snack))

    saveCart(newCart)
  }

  function updateSnackQuantity(snack: Snack, newQuantity: number) {
    if(newQuantity <= 0) return

    const snackExistentInCart = cart.find((item) => item.id === snack.id && item.snack === snack.snack)

    if(!snackExistentInCart) return

    const newCart = cart.map((item) => {
      if (item.id === snackExistentInCart.id && item.snack === snackExistentInCart.snack) {
        const total = item.price * newQuantity

        return {...item, quantity: newQuantity, subtotal: total}
      }

      return item
    })

    saveCart(newCart)
  }

  function snackCartIncrement(snack: Snack) {
    const newQuantity = snack.quantity + 1
    updateSnackQuantity(snack, newQuantity)
  }

  function snackCartDecrement(snack: Snack) {
    const newQuantity = snack.quantity - 1
    updateSnackQuantity(snack, newQuantity)
  }

  function confirmOrder() {
    navigate('/payment')
  }

  async function payOrder(customer: CustomerData) {
    try{
      const response = await processCheckout(cart, customer)

      if(response.data.status !== 'PAID') {
        toast.error('Erro ao processar o pagamento, tente novamente mais tarde.')
        return 
      }

      clearCart()
      navigate(`/order/success/${response.data.id}`)
    }catch(error){
      console.error(error)
      toast.error('Erro ao processar pedido.')
    }

    return 
  }

  return (
    <CartContext.Provider 
    value={{
      cart, 
      addSnackIntoCart,
      removeSnackFromCart,
      snackCartIncrement,
      snackCartDecrement,
      confirmOrder,
      payOrder
    }}>
      {children}
    </CartContext.Provider>
  )
}