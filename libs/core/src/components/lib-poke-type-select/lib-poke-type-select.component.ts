import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from "@angular/core";
import { ControlValueAccessor, FormsModule } from "@angular/forms";
import { DropdownModule } from 'primeng/dropdown';
import { PokeService } from "../../services/poke.service";
import { provideValueAccessor } from "../../utils";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'lib-poke-type-select',
  template: `
    @if (pokeTypes$ | async; as pokeTypes) {
      <span class="p-fluid">
        <p-dropdown [options]="pokeTypes"
          optionValue="id"
          optionLabel="name"
          [(ngModel)]="state"
          (onChange)="onSelect()"
          placeholder="Pokemon Type"
          [filter]="true"
          filterBy="name">
        </p-dropdown>
      </span>
    }
  `,
  standalone: true,
  imports: [
    DropdownModule,
    AsyncPipe,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideValueAccessor(LibPokeTypeSelectComponent),
  ],
})
export class LibPokeTypeSelectComponent implements ControlValueAccessor {
  private readonly cd = inject(ChangeDetectorRef);
  private readonly pokeService = inject(PokeService);

  state?: number;
  onChange = (value?: number) => {};
  onTouched = () => {};
  disabled: boolean = false;
  
  pokeTypes$ = this.pokeService.getPokeTypes();

  writeValue(value: number): void {
    this.state = value;
    this.cd.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cd.markForCheck();        
  }

  onSelect(): void {
    this.onChange(this.state);
  }
}