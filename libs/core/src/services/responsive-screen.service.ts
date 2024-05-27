import { computed, DestroyRef, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent, tap } from 'rxjs';
import { Checkpoints } from '../consts/layout.const';

@Injectable()
export class ResponsiveScreenService {
  private readonly destroy: DestroyRef = inject(DestroyRef);

  screenWidth: WritableSignal<number> = signal(window.innerWidth);

  isMobile: Signal<boolean> = computed(() => {
    return this.screenWidth() <= Checkpoints.SM;
  })

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(500),
        takeUntilDestroyed(this.destroy),
        tap((event: any) => {
          this.screenWidth.set(<number>event.target.innerWidth)
        })
      )
      .subscribe();
  }
}
