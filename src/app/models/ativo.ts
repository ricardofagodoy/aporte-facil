import { InfoAtivo } from "./infoAtivos";

export type Ativo = {
    ticker : string,
    quantidade : number,
    peso : number,
    infoAtivo: InfoAtivo,
    cotacao: number,
    //valor: number,
    acao: number
    //acao_valor: number
}