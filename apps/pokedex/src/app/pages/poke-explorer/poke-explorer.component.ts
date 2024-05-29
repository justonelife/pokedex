import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { LibPokeListComponent, LibPokeTypeSelectComponent, LibSpinnerDirective, PokeService } from "@pokedex/core";
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { catchError, finalize, of, Subject, switchMap } from "rxjs";
import { ORDER, SORT_BY } from "./poke-explore.consts";

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
    LibSpinnerDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeExplorerComponent {
  private readonly destroy = inject(DestroyRef);
  private readonly pokeService = inject(PokeService);
  private readonly cdr = inject(ChangeDetectorRef);

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

  loading: boolean = false;
  vm$ = this.submitFilterValue$.pipe(
    takeUntilDestroyed(this.destroy),
    switchMap(({ sortBy, type }) => {
      this.loading = true;
      this.cdr.markForCheck();

      return this.pokeService.getPokemons(sortBy, type, 0, 10)
        .pipe(
          finalize(() => {
            this.loading = false;
            this.cdr.markForCheck();
          }),
          catchError((err) => {
            console.error(err);
            return of([]);
          }),
        )
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