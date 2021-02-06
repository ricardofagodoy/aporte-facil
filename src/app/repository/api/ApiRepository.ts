import { Carteira } from "../../models/carteira";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiRepository {
    
    constructor(private http : HttpClient) {}

    getCarteira(): Promise<Carteira> {
        return this.http.get<Carteira>(
            `${environment.backend_host}/carteira`, 
            { withCredentials: true }
        ).toPromise()
    }    
    
    updateCarteira(carteira: Carteira): Promise<Carteira> {
        return this.http.patch<Carteira>(
            `${environment.backend_host}/carteira`, 
            carteira, 
            { withCredentials: true }
        ).toPromise()
    }

    getAtivos() : Promise<string[]> {
        return this.http.get<string[]>(
            `${environment.backend_host}/ativos`, 
            { withCredentials: true }
        ).toPromise()
    }

    sendFeedback(feedback : string) : Promise<void> {

        console.log('Sending feedback: ' + feedback)
        
        return this.http.post<void>(
            `${environment.backend_host}/feedback`,
            feedback,
            {withCredentials: true}
        ).toPromise()
    }

    login(token : string) : Promise<string> {
        return this.http.post(
            `${environment.backend_host}/login`,
            {token},
            {withCredentials: true, responseType: 'text'}
        ).toPromise()
    }
}