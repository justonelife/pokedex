import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { TYPE_TO_CLASS_MAPPER } from "./lib-poke-type-badge.const";
import { PokeTypePipe } from "../../pipes";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'lib-poke-type-badge',
  template: `
    @if (pokeType | pokeType | async; as type) {
      @if (MAPPER[type]) {
        <span [class]="MAPPER[type]"
          class="px-4 py-1 rounded-full capitalize text-white text-xs cursor-default">
          {{ type }}
        </span>
      } @else {
        <span class="px-4 py-1 rounded-full capitalize bg-stone-300 text-white text-xs cursor-default">
          {{ type }}
        </span>
      }
    }
  `,
  standalone: true,
  imports: [
    PokeTypePipe,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibPokeTypeBadgeComponent {
  @Input({ alias: 'pokeType', required: true }) pokeType!: number;

  readonly MAPPER = TYPE_TO_CLASS_MAPPER;
}