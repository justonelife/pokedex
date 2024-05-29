import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IPokemon, LibPokeListComponent, LibPokeTypeSelectComponent, LibSpinnerDirective, PokeService } from "@pokedex/core";
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { BehaviorSubject, catchError, combineLatest, finalize, map, of, scan, Subject, switchMap, tap } from "rxjs";
import { ORDER, SORT_BY } from "./poke-explore.consts";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ScrollTopModule } from 'primeng/scrolltop';

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
    InfiniteScrollModule,
    ScrollTopModule,
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
  currentPage: number = 0;
  private pageChanged$: BehaviorSubject<null> = new BehaviorSubject<null>(null);

  vm$ = combineLatest({
    filters: this.submitFilterValue$.pipe(
      tap(() => this.currentPage = 0),
      tap(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    ),
    pageChanged: this.pageChanged$
  }).pipe(
    takeUntilDestroyed(this.destroy),
    map(({ filters }) => {
      return ({
        sortBy: filters.sortBy,
        type: filters.type,
        page: this.currentPage
      })
    }),
    switchMap(({ sortBy, type, page }) => {
      this.loading = true;
      this.cdr.markForCheck();

      return this.pokeService.getPokemons(sortBy, type, page, 50)
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
    scan((acc: IPokemon[], current: IPokemon[], index: number) => {
      if (this.currentPage === 0) {
        return current;
      }
      return [...acc, ...current];
    }, []),
  );

  onSubmit(): void {
    const { sort, order, type } = this.filterForm.getRawValue();
    let sortBy: string = order === 'asc'
      ? sort
      : '-' + sort;
    this.submitFilterValue$.next({ sortBy, type });
  }

  onScroll(): void {
    this.currentPage++;
    this.pageChanged$.next(null);
  }
}