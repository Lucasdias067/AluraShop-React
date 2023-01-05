import { createContext, useContext, useEffect, useState } from "react";
import { usePagamentoContext } from "./Pagamento";
import { IFeira, childrenProps } from "types/Feira";

interface createContextValue {
  carrinho: IFeira[],
  setCarrinho: React.Dispatch<React.SetStateAction<IFeira[]>>,
  quantidadeProduto: number,
  setQuantidadeProduto: React.Dispatch<React.SetStateAction<number>>,
  totalProduto: number,
  setTotalProduto: React.Dispatch<React.SetStateAction<number>>
}

export const CarrinhoContext = createContext({} as createContextValue)
export const CarrinhoProvider = ({ children }: childrenProps) => {

  const [carrinho, setCarrinho] = useState<IFeira[]>([])
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(0)
  const [totalProduto, setTotalProduto] = useState<number>(0)

  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho, quantidadeProduto, setQuantidadeProduto, totalProduto, setTotalProduto }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export const useCarrinhoContext = () => {
  const {
    carrinho,
    setCarrinho,
    quantidadeProduto,
    setQuantidadeProduto,
    totalProduto,
    setTotalProduto
  } = useContext(CarrinhoContext);

  const { formaPagamento } = usePagamentoContext();

  function mudarQuantidade(id: string, quantidade: number) {
    return carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
      return itemDoCarrinho;
    });
  }

  function adicionarProduto(novoProduto: IFeira) {
    const temProduto = carrinho.some(itemCarrinho => itemCarrinho.id === novoProduto.id)
    if (!temProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho(carrinhoAnterior => [...carrinhoAnterior, novoProduto])
    }
    setCarrinho(mudarQuantidade(novoProduto.id, 1));
  }

  function removerProduto(id: string) {
    const produto = carrinho.find(itemCarrinho => itemCarrinho.id === id)
    const ultimo = produto?.quantidade === 1;
    if (ultimo) {
      return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(itemCarrinho => itemCarrinho.id !== id))
    }
    setCarrinho(mudarQuantidade(id, -1));
  }

  function efetuarCompra(setSaldo: React.Dispatch<React.SetStateAction<string>>) {
    setCarrinho([]);
    setSaldo(saldoAnterior => {
      const saldo = Number(saldoAnterior) - totalProduto;
      return String(saldo)
    });
  }

  useEffect(() => {
    const { novoTotal, novaQuantidade } = carrinho.reduce((acc, produto) => ({
      novaQuantidade: acc.novaQuantidade + produto.quantidade,
      novoTotal: acc.novoTotal + (produto.valor * produto.quantidade)
    }), {
      novaQuantidade: 0,
      novoTotal: 0
    })
    setQuantidadeProduto(novaQuantidade);
    setTotalProduto(novoTotal * formaPagamento.juros)
  }, [carrinho, setQuantidadeProduto, setTotalProduto, formaPagamento])

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    quantidadeProduto,
    setQuantidadeProduto,
    totalProduto,
    efetuarCompra
  }
}