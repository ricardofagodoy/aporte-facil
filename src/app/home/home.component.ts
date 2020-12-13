import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {

  ativos : Array<string> = ['KNRI11', 'PETR4', 'HGLG11']
  carteira : any = {
    name: 'Ricardo',
      saldo: 1780,
      ativos: [
        {ticker: 'KNRI11', quantidade: 12, peso: 5, cotacao: 115.80, acao: 3},
        {ticker: 'HGLG11', quantidade: 32, peso: 8, cotacao: 354.80, acao: 0}
      ]
  }

  novo_ativo : any
  investido : number

  // Flag to control edition state
  saldo_editable : boolean = false
  ativo_editable_row : number

  // Table
  dataSource : MatTableDataSource<any[]>
  displayedColumns: string[] = [ "editar", "ticker", "quantidade", "peso", "cotacao", "valor", "acao", "valor_acao", "concluir" ]

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.novo_ativo = {}
    this.investido = this.carteira.ativos.map(p => p.quantidade * p.cotacao).reduce((a, b) => a + b)
    this.dataSource = new MatTableDataSource(this.carteira.ativos);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }

  alterarSaldo(novo_saldo : number) {
    this.saldo_editable = false

    // Call server
    this.carteira.saldo = Math.max(Math.min(novo_saldo, 1e7), 0)
  }

  editarAtivo(index) {
    this.ativo_editable_row = index
  }

  salvarAtivo() {
    // Call server
    delete this.ativo_editable_row;
  }

  deletarAtivo(index) {
    this.dataSource.data = this.dataSource.data.filter((_, i) => i != index)
    this.salvarAtivo()
  }

  adicionarAtivo() {

    if (!this.novo_ativo.ticker || !this.novo_ativo.quantidade || !this.novo_ativo.peso)
      return

    // Call server
    const nova_carteira = [...this.dataSource.data, {...this.novo_ativo, cotacao: 345.20, acao: 3}]

    this.dataSource.data = nova_carteira
    this.novo_ativo = {}
  }
}
