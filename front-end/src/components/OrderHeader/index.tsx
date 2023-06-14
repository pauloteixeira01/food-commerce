import {Link} from 'react-router-dom'

import logoImg from '../../assets/logo.svg'
import {ReactComponent as CartIcon} from '../../assets/shopping-cart.svg'
import {useCart} from '../../hooks/useCart'

import {Container} from './styles'


export function OrderHeader() {
  const {cart} = useCart()
  const snack = cart.length < 2 ? 'lanche' : 'lanches'

  return (
  <Container>
    <Link to={'/'}>
    
    <img src={logoImg} alt='Food Commerce'/>
    </Link>
    <div>
      <div>
        <h3>Meu pedido</h3>
        <span>
          <strong>{`${cart.length}`.padStart(2, '0')}</strong> {snack}         
        </span>
      </div>
      <CartIcon />
    </div>
  </Container>

  )
}