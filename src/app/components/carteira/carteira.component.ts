import { Component, OnInit } from '@angular/core';
import { CarteiraService } from './carteira.service';
import { Carteira } from '../../models/carteira';
import { Ativo } from '../../models/ativo';
import { InfoAtivo } from '../../models/infoAtivo';
import { LoginService } from '../login/login.service';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0 }), stagger('100ms', animate('1000ms ease-out', style({ opacity: 1 })))],
      { optional: true }
    )
  ])
]);

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.scss'],
  animations: [listAnimation]
})
export class CarteiraComponent implements OnInit {

  // View bindings
  carteira : Carteira
  name : string

  infoAtivo : InfoAtivo

  novo_ativo : Ativo

  // Ativos
  ativos : string[]
  ativosAutoComplete : string[]
  myControl = new FormControl();

  investido : number

  // Flag to control edition state
  saldo_editable : boolean = false
  ativo_editable_row : number = undefined

  constructor(private service : CarteiraService,
              private loginService : LoginService,
              private _snackBar: MatSnackBar) {}

  ngOnInit() {

    // Creates empty novo_ativo
    this.inicializaNovoAtivo();
    
    // Load carteira
    this.loadCarteira()

    // Bind name
    this.name = this.loginService.getLoggedUser()

    // Load ativos
    this.service.getAtivos().then(ativos => {
      this.ativos = ativos
      this.ativoChanged()
    })
  }

  inicializaNovoAtivo() {
    this.infoAtivo = {
      cotacao: 0,
      dy: 0,
      pvp: 0
    }
  
    this.novo_ativo = {
      ticker : "",
      quantidade : 0,
      peso : 0,
      infoAtivo: this.infoAtivo,
      acao: 0,
      quarentena: false
    }
  }

  ativoChanged() {
    this.ativosAutoComplete = this._filterAtivo(this.novo_ativo.ticker)
  }

  private _filterAtivo(name: string = ''): string[] {
    const filterValue = name.toLowerCase();
    return this.ativos.filter(ativo => ativo.toLowerCase().indexOf(filterValue) === 0);
  }

  // After saldo being changed and saved
  alterarSaldo(novo_saldo : number) {

    // Change input to label again
    this.saldo_editable = false

    // Validate absurd values
    this.carteira.saldo = Math.max(Math.min(novo_saldo, 1e7), 0)

    this.updateCarteira()

    this._snackBar.open('Saldo disponível para aportes alterado', 'OK', {
      duration: 4000,
    })
  }

  editarAtivo(index) {
    // Sets index row to edit mode
    this.ativo_editable_row = index
  }

  toggleQuarentena(element : Ativo) {
    // Toggles quarentena
    element.quarentena = !element.quarentena

    this.updateCarteira()

    this._snackBar.open(`Ativo ${element.ticker} ${element.quarentena ? 'colocado em' : 'removido da'} quarentena`, 'OK', {
      duration: 4000,
    })
  }

  toggleQuarentenaNovoAtivo() {
    // Toggles quarentena novo_ativo
    this.novo_ativo.quarentena = !this.novo_ativo.quarentena
  }

  // After saving edited row
  salvarAtivo(element : Ativo) {

    // No rows in edit mode
    delete this.ativo_editable_row;

    element.quantidade = Math.max(element.quantidade, 0)
    element.peso = Math.max(element.peso, 0)

    this.updateCarteira() 

    this._snackBar.open(`Ativo ${element.ticker} (Qtde ${element.quantidade} / Peso ${element.peso}) salvo`, 'OK', {
      duration: 4000,
    })
  }

  // After deleting row
  deletarAtivo(index) {

    // Find
    const ativo = this.carteira.ativos[index]

    // Filter out removed row
    this.carteira.ativos = this.carteira.ativos.filter((_, i) => i != index)

    // No rows in edit mode
    delete this.ativo_editable_row;

    this.updateCarteira()

    this._snackBar.open(`Ativo ${ativo.ticker} removido da carteira`, 'OK', {
      duration: 4000,
    })
  }

  adicionarAtivo() {

    if (!this.novo_ativo.ticker || this.ativos.indexOf(this.novo_ativo.ticker) < 0 ||
        this.novo_ativo.quantidade == undefined || this.novo_ativo.quantidade < 0 || 
        this.novo_ativo.peso == undefined || this.novo_ativo.peso < 0)
      return

    this.novo_ativo.quarentena = this.novo_ativo.quarentena ? this.novo_ativo.quarentena : false;

    this.carteira.ativos.push(this.novo_ativo)

    this._snackBar.open(`Ativo ${this.novo_ativo.ticker} (Qtde ${this.novo_ativo.quantidade} / Peso ${this.novo_ativo.peso}) adicionado`, 'OK', {
      duration: 4000,
    })
    
    // Clear table footer input values
    this.inicializaNovoAtivo();
    this.ativoChanged()

    this.updateCarteira() 
  }

  executarCompra(index) {

    const ativo = this.carteira.ativos[index]
    ativo.quantidade+=ativo.acao

    this.carteira.saldo-=ativo.acao*ativo.infoAtivo.cotacao

    this.updateCarteira()

    this._snackBar.open(`Compra de ${ativo.acao} unidades de ${ativo.ticker} registrada`, 'OK', {
      duration: 4000,
    })
  }

  private updateCarteira() {
    this.service.updateCarteira(this.carteira)
      .then(this.setCarteira.bind(this))
      .catch(() => window.location.reload()) 
  }

  private loadCarteira() {
    this.service.getCarteira().then(this.setCarteira.bind(this))
  }

  private setCarteira(carteira : Carteira) {
    // Bind
    this.carteira = carteira

    // Calculate all invested money
    this.investido = this.carteira.ativos.map(p => p.quantidade * p.infoAtivo.cotacao).reduce((a, b) => a + b, 0)
  }
}
