import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Carteira } from '../../models/carteira';
import { Ativo } from '../../models/ativo';
import { InfoAtivo } from '../../models/infoAtivo';
import { LoginService } from '../login/login.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

  constructor(private service : HomeService,
              private loginService : LoginService) {}

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
  }

  editarAtivo(index) {
    // Sets index row to edit mode
    this.ativo_editable_row = index
  }

  toggleQuarentena(element : Ativo) {
    // Toggles quarentena
    element.quarentena = !element.quarentena

    this.updateCarteira()
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
  }

  // After deleting row
  deletarAtivo(index) {

    // Filter out removed row
    this.carteira.ativos = this.carteira.ativos.filter((_, i) => i != index)

    // No rows in edit mode
    delete this.ativo_editable_row;

    this.updateCarteira() 
  }

  adicionarAtivo() {

    if (!this.novo_ativo.ticker || this.ativos.indexOf(this.novo_ativo.ticker) < 0 ||
        this.novo_ativo.quantidade == undefined || this.novo_ativo.quantidade < 0 || 
        this.novo_ativo.peso == undefined || this.novo_ativo.peso < 0)
      return

    this.novo_ativo.quarentena = this.novo_ativo.quarentena ? this.novo_ativo.quarentena : false;

    this.carteira.ativos.push(this.novo_ativo)

    // Clear table footer input values
    this.inicializaNovoAtivo();

    this.updateCarteira() 
  }

  executarCompra(index) {
    const ativo = this.carteira.ativos[index]
    ativo.quantidade+=ativo.acao
    this.carteira.saldo-=ativo.acao*ativo.infoAtivo.cotacao

    this.updateCarteira()
  }

  private updateCarteira() {
    this.service.updateCarteira(this.carteira).then(this.setCarteira.bind(this))
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
