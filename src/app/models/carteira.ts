import { Ativo } from "./ativo";

export type Carteira = {
    nome: string,
    saldo: number,
    ativos: Ativo[]
}