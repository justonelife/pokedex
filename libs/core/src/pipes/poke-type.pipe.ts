import { inject, Pipe, PipeTransform } from "@angular/core";
import { PokeService } from "../services/poke.service";
import { map, Observable } from "rxjs";

@Pipe({
  name: 'pokeType',
  standalone: true,
})
export class PokeTypePipe implements PipeTransform {
  private readonly pokeService = inject(PokeService);

  transform(type: number): Observable<string> {
    return this.pokeService.getPokeTypes()
      .pipe(
        map(types => {
          return (types.find(t => t.id === type)?.name as string).toLocaleLowerCase();
        }),
      )
  }
}