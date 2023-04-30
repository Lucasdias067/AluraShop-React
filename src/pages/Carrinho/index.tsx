import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { usePagamentoContext } from 'common/context/Pagamento';
import { UsuarioContext } from 'common/context/Usuario';
import Produto from 'components/Produto';
import React, { useContext, useMemo } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Voltar, TotalContainer, PagamentoContainer } from './styles';

function Carrinho() {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { formaPagamento, tiposPagamento, mudarFormaPagamento } = usePagamentoContext();
  const { carrinho, totalProduto, efetuarCompra } = useCarrinhoContext();
  const { saldo, setSaldo } = useContext(UsuarioContext);
  const saldoTotal = useMemo(() => Number(saldo) - totalProduto, [saldo, totalProduto])
  const navigate = useNavigate();

  function handleOnChange(e: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) {
    const value = e.target.value
    mudarFormaPagamento(Number(value))
  }

  return (
    <Container>
      <Voltar onClick={() => navigate(-1)} />
      <h2>Carrinho</h2>
      {carrinho.map(produto => (
        <Produto  {...produto}
          key={produto.id} />
      ))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select onChange={handleOnChange} value={formaPagamento.id}>
          {tiposPagamento.map(pagamento => (
            <MenuItem key={pagamento.id} value={pagamento.id}>
              {pagamento.nome}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
        <div>
          <h2>Total: </h2>
          <span>R$ {totalProduto.toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo:  </h2>
          <span> R$ {Number(saldo).toFixed(2)} </span>
        </div>
        <div>
          <h2> Saldo Total:  </h2>
          <span> R$ {saldoTotal.toFixed(2)}</span>
        </div>
      </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
          efetuarCompra(setSaldo);
        }}
        color="primary"
        variant="contained"
        disabled={saldoTotal <= 0 || carrinho.length === 0}
      >
        Comprar
      </Button>
      <Snackbar
        anchorOrigin={
          {
            vertical: 'top',
            horizontal: 'right'
          }
        }
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
        >
          Compra feita com sucesso!
        </MuiAlert>
      </Snackbar>
    </Container>
  )
}

export default Carrinho;