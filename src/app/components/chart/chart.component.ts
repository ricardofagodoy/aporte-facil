import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('pieCanvas') private pieCanvas: ElementRef;

  pieChart: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.pieChartBrowser();
  }

  pieChartBrowser(): void {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Apple', 'Google', 'Facebook', 'Infosys', 'Hp', 'Accenture'],
        datasets: [{
          backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#95a5a6',
            '#9b59b6',
            '#f1c40f',
            '#e74c3c'
          ],
          data: [12, 19, 3, 17, 28, 24]
        }]
      }
    });
  }

}
