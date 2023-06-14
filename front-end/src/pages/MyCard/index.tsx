import {Head} from '../../components/Head'
import { OrderHeader } from '../../components/OrderHeader'
import {Table} from '../MyCard/components/Table'

import { Container } from './styles'

export default function MyCart() {
  return (
    <Container>
     <Head title='Carrinho' />
     <OrderHeader />
     <Table />
    </Container>
  )
}
