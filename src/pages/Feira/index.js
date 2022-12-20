import { Container, Header, Lista, } from './styles';
import feira from './feira.json';
import Produto from 'components/Produto';
import NavBar from './NavBar';
import { UsuarioContext } from "common/context/Usuario";
import { useContext } from 'react';
import { Button } from '@material-ui/core';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { useNavigate } from 'react-router-dom';

function Feira() {

  const { name, saldo } = useContext(UsuarioContext)
  const { quantidadeProduto } = useCarrinhoContext();
  const navigate = useNavigate();

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
      <div>
        <Button
          onClick={() => { navigate('/carrinho') }}
          color="primary"
          variant="contained"
          disabled={!quantidadeProduto}
        >
          Carrinho
        </Button>
      </div>
    </Container>
  )
}

export default Feira;