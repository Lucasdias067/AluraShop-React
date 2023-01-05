import { Button } from '@material-ui/core';
import { Container, Titulo, InputContainer } from './styles';
import { Input, InputLabel, InputAdornment } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { UsuarioContext } from "common/context/Usuario";
import { useContext } from 'react';

export default function Login() {

  const navigate = useNavigate();
  const { name, setName, saldo, setSaldo } = useContext(UsuarioContext)

  return (
    <Container>
      <Titulo>Insira o seu nome</Titulo>
      <InputContainer>
        <InputLabel>Nome</InputLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>Saldo</InputLabel>
        <Input
          onClick={() => setSaldo(saldo => saldo === '0' ? "" : saldo)}
          value={saldo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSaldo(e.target.value)}
          type="number"
          startAdornment={
            <InputAdornment position="start">R$</InputAdornment>
          }
        />
      </InputContainer>
      <Button
        variant="contained"
        color="primary"
        disabled={name.length < 4}
        onClick={() => { navigate('/feira'); }}
      >
        Avançar
      </Button>
    </Container>
  )
};

