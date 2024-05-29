import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from "@angular/core";
import { ChartOptions } from "chart.js";
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { IPokemon } from "../../interfaces";
import { LibPokeTypeBadgeComponent } from "../lib-poke-type-badge";

@Component({
  selector: 'lib-poke-detail',
  templateUrl: './lib-poke-detail.component.html',
  standalone: true,
  imports: [
    LibPokeTypeBadgeComponent,
    ButtonModule,
    ChartModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibPokeDetailComponent implements OnInit {
  private readonly dialogConfig = inject(DynamicDialogConfig, { optional: true });
  public readonly dialogRef = inject(DynamicDialogRef, { optional: true });

  @Input('data') _data?: IPokemon;

  get data(): IPokemon {
    return this._data || this.dialogConfig?.data;
  }
  
  stats: any;

  options: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 200,
        ticks: {
          minRotation: 0,
        }
      }
    }
  }

  ngOnInit(): void {
    const { hp, attack, defense, sp_atk, sp_def, speed } = this.data;
    this.stats = {
      labels: ['HP', 'Attack', 'Defense', 'Sp.Attack', 'Sp.Defense', 'Speed'],
      datasets: [
          {
            data: [hp, attack, defense, sp_atk, sp_def, speed]
          },
      ]
    }
  }
}