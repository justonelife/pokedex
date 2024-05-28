import { forwardRef, Provider } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

export function provideValueAccessor<C>(component: C): Provider {
  return ({
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true
  });
}