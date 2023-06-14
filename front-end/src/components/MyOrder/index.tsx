import {useCart} from '../../hooks/useCart'
import {ReactComponent as CardIcon} from '../../assets/shopping-cart.svg'

import {Container} from './styles'

export function MyOrder() {
  const {cart} = useCart()

  return (
    <Container to={'cart'}>
      <span>Meu pedido</span>
      <CardIcon/>

      {cart.length !== 0 && <span>{`${cart.length}`.padStart(2, '0')}</span>}
    </Container>
  )
}