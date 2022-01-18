import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { CarteiraService } from '../carteira/carteira.service';
import { Carteira } from '../../models/carteira';
import { Ativo } from '../../models/ativo';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('pieAtualCanvas') private pieAtualCanvas: ElementRef;
  @ViewChild('pieMetaCanvas') private pieMetaCanvas: ElementRef;

  pieAtual: any;
  pieMeta: any;
  ativos: Ativo[]
  tickers: string[] = []
  valuesAtual: string[] = []
  valuesMeta: string[] = []
  totalPesos: number = 0
  colors: string[] = []
  totalInvestido : number

  constructor(private service : CarteiraService) {}

  ngAfterViewInit(): void {
    // Load carteira
    this.loadCarteira();
  }

  buildPieAtual(): void {
    console.log(this.tickers)
    this.pieAtual = new Chart(this.pieAtualCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.tickers,
        datasets: [{
          backgroundColor: this.colors,
          data: this.valuesAtual
        }]
      }
    });
  }

  buildPieMeta(): void {
    this.pieMeta = new Chart(this.pieMetaCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.tickers,
        datasets: [{
          backgroundColor: this.colors,
          data: this.valuesMeta
        }]
      }
    });
  }

  private loadCarteira() {
    this.service.getCarteira().then(this.setCarteira.bind(this))
  }

  private setCarteira(carteira : Carteira) {
    this.ativos = carteira.ativos

    // Calculate all invested money
    this.totalInvestido = this.ativos.map(p => p.quantidade * p.infoAtivo.cotacao).reduce((a, b) => a + b, 0)
    this.ativos.map(p => {
      this.tickers.push(p.ticker);
      this.totalPesos += p.peso;
    })
    console.log(this.totalPesos)
    this.ativos.map(p => {
      this.valuesAtual.push((((p.quantidade * p.infoAtivo.cotacao) / this.totalInvestido) * 100).toFixed(2));
      this.valuesMeta.push(((p.peso / this.totalPesos) * 100).toFixed(2))
      this.colors.push(this.getRandomColor());
    })
    this.buildPieAtual();
    this.buildPieMeta();
  }

  private getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

}
