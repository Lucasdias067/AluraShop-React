import {
  Container,
  Header,
  Lista,
} from './styles';
import feira from './feira.json';
import Produto from 'components/Produto';
import NavBar from './NavBar';
import { UsuarioContext } from "common/context/Usuario";
import { useContext } from 'react';

function Feira() {

  const { name, saldo } = useContext(UsuarioContext)

  return (
    <Container>
      <NavBar />
      <Header>
        <div>
          <h2> Olá! {name}</h2>
          <h3> Saldo: R$ {Number(saldo).toFixed(2)}</h3>
        </div>
        <p>Encontre os melhores produtos orgânicos!</p>
      </Header>
      <Lista>
        <h2>
          Produtos:
        </h2>
        {feira.map(produto => (
          <Produto
            {...produto}
            key={produto.id}
          />
        ))}
      </Lista>
    </Container>
  )
}

export default Feira;