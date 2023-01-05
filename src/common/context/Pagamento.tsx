import { createContext, useContext, useState } from "react";
import { childrenProps } from "types/Feira";

interface pagamentosProps {
  nome: string,
  juros: number,
  id: number
}

interface PagamentoContextValue {
  formaPagamento: pagamentosProps,
  setFormaPagamento: React.Dispatch<React.SetStateAction<pagamentosProps>>,
  tiposPagamento: pagamentosProps[]
}

export const PagamentoContext = createContext({} as PagamentoContextValue)

export const PagamentoProvider = ({ children }: childrenProps) => {

  const tiposPagamento = [{
    nome: 'Boleto',
    juros: 1,
    id: 1,
  }, {
    nome: 'Cartão de Crédito',
    juros: 1.1,
    id: 2,
  }, {
    nome: 'PIX',
    juros: 1,
    id: 3,
  }, {
    nome: 'Crediário',
    juros: 1.2,
    id: 4,
  }]

  const [formaPagamento, setFormaPagamento] = useState<pagamentosProps>(tiposPagamento[0])

  return (
    <PagamentoContext.Provider value={{ formaPagamento, setFormaPagamento, tiposPagamento }}>
      {children}
    </PagamentoContext.Provider>
  )
}

export const usePagamentoContext = () => {

  const {
    formaPagamento,
    setFormaPagamento,
    tiposPagamento
  } = useContext(PagamentoContext);

  function mudarFormaPagamento(id: number) {
    const pagamentoAtual = tiposPagamento.find(pagamento => pagamento.id === id)
    if (pagamentoAtual !== undefined) setFormaPagamento(pagamentoAtual)
  }

  return {
    formaPagamento,
    mudarFormaPagamento,
    tiposPagamento
  }
}
