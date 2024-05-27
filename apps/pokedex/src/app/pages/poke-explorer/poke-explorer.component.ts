import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'poke-explorer',
  templateUrl: './poke-explorer.component.html',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeExplorerComponent {

}