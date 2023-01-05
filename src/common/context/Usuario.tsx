import { createContext, useState } from "react";
import { childrenProps } from "types/Feira";

interface UsuarioContextValue {
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  saldo: string,
  setSaldo: React.Dispatch<React.SetStateAction<string>>
}

export const UsuarioContext = createContext({} as UsuarioContextValue);

export const UsuarioProvider = ({ children }: childrenProps) => {

  const [name, setName] = useState<string>('')
  const [saldo, setSaldo] = useState<string>('0')

  return (
    <UsuarioContext.Provider value={{ name, setName, saldo, setSaldo }}>
      {children}
    </UsuarioContext.Provider>
  )
}