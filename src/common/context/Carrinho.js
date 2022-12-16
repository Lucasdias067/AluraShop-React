import { createContext, useContext, useEffect, useState } from "react";
import { usePagamentoContext } from "./Pagamento";
export const CarrinhoContext = createContext()

export const CarrinhoProvider = ({ children }) => {

  const [carrinho, setCarrinho] = useState([])
  const [quantidadeProduto, setQuantidadeProduto] = useState(0)
  const [totalProduto, setTotalProduto] = useState(0)

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

  function mudarQuantidade(id, quantidade) {
    return carrinho.map(itemDoCarrinho => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
      return itemDoCarrinho;
    });
  }

  function adicionarProduto(novoProduto) {
    const temProduto = carrinho.some(itemCarrinho => itemCarrinho.id === novoProduto.id)
    if (!temProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho(carrinhoAnterior => [...carrinhoAnterior, novoProduto])
    }
    setCarrinho(mudarQuantidade(novoProduto.id, 1));
  }

  function removerProduto(id) {
    const produto = carrinho.find(itemCarrinho => itemCarrinho.id === id)
    const ultimo = produto.quantidade === 1;
    if (ultimo) {
      return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(itemCarrinho => itemCarrinho.id !== id))
    }
    setCarrinho(mudarQuantidade(id, -1));
  }

  function efetuarCompra(setSaldo) {
    setCarrinho([]);
    setSaldo(saldoAnterior => saldoAnterior - totalProduto);
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