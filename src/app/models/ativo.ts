import { InfoAtivo } from "./infoAtivo";

export type Ativo = {
    ticker : string,
    quantidade : number,
    peso : number,
    infoAtivo: InfoAtivo,
    //valor: number,
    acao: number,
    quarentena: boolean
    //acao_valor: number
}