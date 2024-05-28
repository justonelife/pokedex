import { JsonPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IPokemon } from "../../interfaces";

@Component({
  selector: 'lib-poke-list',
  templateUrl: './lib-poke-list.component.html',
  standalone: true,
  imports: [
    JsonPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibPokeListComponent {

  @Input() data: IPokemon[] | null = [];
}