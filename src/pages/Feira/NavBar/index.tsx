import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UsuarioContext } from 'common/context/Usuario';

export default function NavBar() {

  const { quantidadeProduto } = useCarrinhoContext();
  const { setName } = useContext(UsuarioContext)
  const navigate = useNavigate();

  return (
    <Nav >
      <Logo onClick={() => { navigate('/'); setName('') }} className="logo" />
      <IconButton disabled={!quantidadeProduto} onClick={() => navigate('/carrinho')}>
        <Badge
          color="primary"
          overlap="rectangular"
          badgeContent={quantidadeProduto}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}