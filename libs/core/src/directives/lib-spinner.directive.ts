import { Directive, ElementRef, HostListener, inject, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: '[libSpinner]',
  standalone: true,
})
export class LibSpinnerDirective {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  @Input({ alias: 'libSpinner', required: true }) set loading(v: boolean) {
    if (!this.spinnerEl) {
      this.initLoading();
    }
    
    if (v) {
      this.showLoading();
    } else {
      this.hideLoading();
    }
  }

  @HostListener("document:scroll")
  onScroll(): void {
    this.renderer.setStyle(this.spinnerEl, 'height', this.computeSpinnerHeight() + 'px');
  }

  private spinnerEl!: HTMLElement;

  private initLoading(): void {
    const spinIcon = this.renderer.createElement('i');
    this.addKlasses(spinIcon, 'pi', 'pi-spin', 'pi-spinner');

    this.spinnerEl = this.renderer.createElement('span');
    this.addKlasses(this.spinnerEl, 'sticky', 'w-full', 'bg-black/20', 'top-0', 'items-center', 'justify-center');

    this.renderer.setStyle(this.spinnerEl, 'height', this.computeSpinnerHeight() + 'px');

    this.renderer.appendChild(this.spinnerEl, spinIcon);
    this.renderer.insertBefore(this.elementRef.nativeElement, this.spinnerEl, this.elementRef.nativeElement.firstChild);
  }

  private addKlasses(element: HTMLElement, ...klasses: string[]): void {
    if (!element) {
      return;
    }

    for (const klass of klasses) {
      this.renderer.addClass(element, klass);
    }
  }

  private removeKlasses(element: HTMLElement, ...klasses: string[]): void {
    if (!element) {
      return;
    }

    for (const klass of klasses) {
      this.renderer.removeClass(element, klass);
    }
  }

  private computeSpinnerHeight(): number {
    const screenHeight = screen.height;
    const { top: fromTop, bottom: fromBottom } = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect();
    
    if (fromTop < 0 && fromBottom >= screenHeight) {
      return screenHeight;
    } else if (fromBottom >= screenHeight) {
      // fromTop >= 0
      return screenHeight - fromTop;
    } else {
      return fromBottom;
    }
  }

  private showLoading(): void {
    this.addKlasses(this.elementRef.nativeElement, 'relative');
    this.removeKlasses(this.spinnerEl, 'hidden');
    this.addKlasses(this.spinnerEl, 'flex');
  }

  private hideLoading(): void {
    this.removeKlasses(this.elementRef.nativeElement, 'relative');
    this.removeKlasses(this.spinnerEl, 'flex');
    this.addKlasses(this.spinnerEl, 'hidden');
  }
}