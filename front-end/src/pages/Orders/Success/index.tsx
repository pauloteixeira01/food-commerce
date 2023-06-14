import {useParams} from 'react-router-dom';
import { Container, Inner, SubTitle, Title } from './styled';
import { Head } from '../../../components/Head';

export default function OrderSuccessPage(){
  const {orderId} = useParams()

  return (
    <Container>
      <Head title='Compra realizada com sucesso!' />
      <Inner>
        <Title>Compra realizada com sucesso!</Title>
        <p>
          Número do pedido<code> #{orderId}</code>
        </p>
        <SubTitle>Contato da loja</SubTitle>

        <ul>
          <li>Endereço: Av. Central, 123</li>
          <li>Fone: 11 984124578</li>
        </ul>

        <br />
        <a href="/">Voltar para a página inicial.</a>
      </Inner>
    </Container>
  )
}