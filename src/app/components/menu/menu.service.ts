import { Injectable } from "@angular/core";
import { ApiRepository } from "../../repository/api/ApiRepository";

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    
    constructor(private repository : ApiRepository) {}

    async sendFeedback(feedback : string) : Promise<void> {
        return this.repository.sendFeedback(feedback)
    }
}