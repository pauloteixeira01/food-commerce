import { Outlet } from 'react-router-dom'

import {Sidebar} from '../../components/Sidebar'
import {MyOrder} from '../../components/MyOrder'
import logo from '../../assets/logo.svg'

import { Container } from './styles'

export default function Main() {
  return (
    <Container>
      <Sidebar />
      <section>
        <img src={logo} />
        <Outlet />
      </section>
      <MyOrder />
    </Container>
  )
}
