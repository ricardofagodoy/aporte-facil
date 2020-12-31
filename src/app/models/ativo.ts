import { InfoAtivos } from "./infoAtivos";

export type Ativo = {
    ticker : string,
    quantidade : number,
    peso : number,
    infoAtivos: InfoAtivos,
    cotacao: number,
    //valor: number,
    acao: number
    //acao_valor: number
}