import { inject, Injectable } from "@angular/core";
import { IPokemon, PokeType } from "../interfaces";
import { map, Observable, shareReplay } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class PokeService {
  private readonly httpClient = inject(HttpClient);

  readonly URL: string = 'https://api.vandvietnam.com/api/pokemon-api/';

  pokeTypes$?: Observable<PokeType[]>;
  getPokeTypes(): Observable<PokeType[]> {
    if (!this.pokeTypes$) {
      this.pokeTypes$ = this.httpClient
        .get<PokeType[]>(this.URL + 'types')
        .pipe(
          map((raw: any) => raw.data),
          shareReplay(1),
        );
    }

    return this.pokeTypes$;
  }

  getPokemons(sort: string, type: string | null = null, page: number = 0, pageSize: number = 10): Observable<IPokemon[]> {
    return this.httpClient.get<IPokemon[]>(this.URL + 'pokemons', { 
      params: {
        sort,
        page,
        size: pageSize,
        'filter[type]': type ? type : ''
      }
    }).pipe(
      map((raw: any) => raw.data)
    );
  }
}