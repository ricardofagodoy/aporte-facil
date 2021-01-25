import { Injectable } from "@angular/core";
import { Carteira } from "../../models/carteira";
import { ApiRepository } from "../../repository/api/ApiRepository";

@Injectable({
    providedIn: 'root'
})
export class CarteiraService {
    
    constructor(private repository : ApiRepository) {}

    async getCarteira() : Promise<Carteira> {
        return this.repository.getCarteira()
    }

    async updateCarteira(carteira : Carteira) : Promise<Carteira> {
        return this.repository.updateCarteira(carteira)
    }

    async getAtivos() : Promise<string[]> {
        return this.repository.getAtivos()
    }
}