import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {

  // User data
  name : string
  portfolio : any[]
  value : number

  // Table
  dataSource : MatTableDataSource<any[]>
  displayedColumns: string[] = [ "ativo", "quantidade", "peso", "cotacao", "valor", "acao", "valor_acao" ]

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.name = 'Ricardo'
    this.portfolio = this.loadPortfolio()
    this.value = this.portfolio.map(p => p.quantidade * p.cotacao).reduce((a, b) => a + b)

    this.dataSource = new MatTableDataSource(this.portfolio);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }

  loadPortfolio() {
    return [
      {ativo: 'KNRI11', quantidade: 12, peso: 5, cotacao: 115.80, acao: 3},
      {ativo: 'HGLG11', quantidade: 32, peso: 8, cotacao: 354.80, acao: 0}
    ]
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
