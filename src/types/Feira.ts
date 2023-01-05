import { ReactNode } from "react";

export interface IFeira {
  nome: string;
  foto: string;
  valor: number;
  id: string;
  quantidade: number;
}

export interface childrenProps {
  children: ReactNode;
}
