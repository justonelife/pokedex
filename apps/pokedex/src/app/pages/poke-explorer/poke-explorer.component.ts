import { ChangeDetectionStrategy, Component, DestroyRef, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { LibPokeListComponent, LibPokeTypeSelectComponent } from "@pokedex/core";
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ORDER, SORT_BY } from "./poke-explore.consts";
import { distinctUntilChanged, Subject, switchMap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PokeService } from "libs/core/src/services/poke.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'poke-explorer',
  templateUrl: './poke-explorer.component.html',
  standalone: true,
  imports: [
    LibPokeListComponent,
    DropdownModule,
    ReactiveFormsModule,
    ButtonModule,
    LibPokeTypeSelectComponent,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeExplorerComponent {
  private readonly destroy = inject(DestroyRef);
  private readonly pokeService = inject(PokeService);

  filterForm: FormGroup = new FormGroup({
    sort: new FormControl('number'),
    order: new FormControl('asc'),
    type: new FormControl(),
  });

  readonly SORT_BY = SORT_BY;
  readonly ORDER = ORDER;

  private submitFilterValue$ = new Subject<{
    sortBy: string,
    type: string
  }>();

  vm$ = this.submitFilterValue$.pipe(
    distinctUntilChanged((prev, cur) => JSON.stringify(prev) === JSON.stringify(cur)),
    takeUntilDestroyed(this.destroy),
    switchMap(({ sortBy, type }) => {
      return this.pokeService.getPokemons(sortBy, type, 0, 10)
    }),
  );

  onSubmit(): void {
    const { sort, order, type } = this.filterForm.getRawValue();
    let sortBy: string = order === 'asc'
      ? sort
      : '-' + sort;
    this.submitFilterValue$.next({ sortBy, type });
  }
}