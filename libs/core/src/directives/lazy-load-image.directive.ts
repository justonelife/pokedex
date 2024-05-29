import { DestroyRef, Directive, ElementRef, inject, Input, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { distinctUntilChanged, Subject, tap } from "rxjs";

@Directive({
  selector: '[lazySrc]',
  standalone: true,
})
export class LazyLoadImageDirective implements OnInit {
  private readonly destroy = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);

  imgSrc!: string;
  enterViewport: boolean = false;
  @Input({ alias: 'lazySrc', required: true }) set lazySrc(v: string) {
    this.imgSrc = v;
    if (this.enterViewport) {
      this.setImage(this.elementRef.nativeElement, this.imgSrc);
    }
  }
  @Input() rootMargin?: string;

  private observer!: IntersectionObserver;
  private observer$: Subject<HTMLElement> = new Subject<HTMLElement>();

  ngOnInit(): void {
    this.setup();
    this.watch();
  }

  private setup(): void {
    const options: IntersectionObserverInit = {
      rootMargin: this.rootMargin,
    };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.observer$.next(entry.target as HTMLElement);
        }
      });
    }, options);
    this.observer.observe(this.elementRef.nativeElement);
  }

  private watch() {
    this.observer$
      .asObservable()
      .pipe(
        distinctUntilChanged(),
        tap((value) => {
          this.enterViewport = true;
          this.setImage(value as any, this.imgSrc);
        }),
        takeUntilDestroyed(this.destroy)
      )
      .subscribe();
  }

  private setImage(element: HTMLDivElement | HTMLImageElement, imageSrc: string) {
    if (!this.isImageElement(element)) {
      element.style.background = `url(${imageSrc})`;
      return;
    }
    if (element instanceof HTMLImageElement) {
      element.src = imageSrc;
    }
  }

  private isImageElement(element: HTMLElement) {
    return element.nodeName.toLowerCase() === 'img';
  }
}