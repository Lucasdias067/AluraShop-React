import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsuarioProvider } from "common/context/Usuario";
import { CarrinhoProvider } from "common/context/Carrinho";
import { PagamentoProvider } from "common/context/Pagamento";

export default function Router() {

  return (
    <BrowserRouter>
      <UsuarioProvider>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/feira' element={<CarrinhoProvider> <PagamentoProvider> <Feira /> </PagamentoProvider></CarrinhoProvider>} />
          <Route exact path='/carrinho' element={<CarrinhoProvider> <PagamentoProvider> <Carrinho /> </PagamentoProvider> </CarrinhoProvider>} />
        </Routes>
      </UsuarioProvider>
    </BrowserRouter>
  )
} 