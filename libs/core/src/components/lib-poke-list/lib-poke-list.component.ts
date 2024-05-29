import { JsonPipe, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Input, TemplateRef } from "@angular/core";
import { LazyLoadImageDirective } from "../../directives";
import { LibPokeTypeBadgeComponent } from "../lib-poke-type-badge";
import { IPokemon } from "../../interfaces";
import { LibPokeDetailComponent } from "../lib-poke-detail";
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

@Component({
  selector: 'lib-poke-list',
  templateUrl: './lib-poke-list.component.html',
  standalone: true,
  imports: [
    JsonPipe,
    LazyLoadImageDirective,
    LibPokeTypeBadgeComponent,
    NgTemplateOutlet,
    LibPokeDetailComponent,
    DynamicDialogModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService]
})
export class LibPokeListComponent {
  private readonly dialogService = inject(DialogService);

  @Input() data: IPokemon[] | null = [];

  openDetail(data: IPokemon): void {
    this.dialogService.open(LibPokeDetailComponent, {
      data,
      styleClass: 'w-11/12 sm:w-1/3',
      dismissableMask: true,
      contentStyle: {
        padding: 0,
        borderRadius: '5px',
      },
      showHeader: false,
    });
  }
}