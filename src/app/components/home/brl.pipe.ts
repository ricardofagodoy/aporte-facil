import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'brl'
})
export class BrlPipe implements PipeTransform {
    
    transform(value: number): any {
        return new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        }).format(value)
    }
}