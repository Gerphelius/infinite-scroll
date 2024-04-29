import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appScrollReachBottom]',
  standalone: true,
})
export class ScrollReachBottomDirective implements AfterViewInit, OnDestroy {
  /**
   * The offset is used to rise the upper bound of observer target element to trigger onBottomReached event earlier
   */
  @Input()
  set bottomOffsetPx(offset: number) {
    this._bottomOffsetPx = `${Math.abs(offset)}px`;
  }
  private _bottomOffsetPx: string = '0px';

  @Output()
  get onBottomReached(): EventEmitter<void> {
    return this._onBottomReached;
  }
  private _onBottomReached: EventEmitter<void> = new EventEmitter<void>();

  private _intersectionObserver: IntersectionObserver;
  private _mutationObserver: MutationObserver = new MutationObserver(
    this._onMutation.bind(this)
  );
  private _bottomEl: HTMLElement;

  constructor(private _el: ElementRef) {}

  ngAfterViewInit(): void {
    this._intersectionObserver = new IntersectionObserver(
      this._onIntersect.bind(this),
      {
        root: this._el.nativeElement,
        rootMargin: this._bottomOffsetPx,
        threshold: 1,
      }
    );

    this._updateObservedEl();
    this._mutationObserver.observe(this._el.nativeElement, { childList: true });
  }

  /**
   * Updates last element from observer element children to set new intersection observer target
   */
  private _onMutation(): void {
    this._intersectionObserver.unobserve(this._bottomEl);
    this._updateObservedEl();
  }

  /**
   * Finds last element of observer element children and set it as observer target element
   */
  private _updateObservedEl(): void {
    this._bottomEl =
      this._el.nativeElement.children[
        this._el.nativeElement.children.length - 1
      ];

    this._intersectionObserver.observe(this._bottomEl);
  }

  /**
   * Emits an event when observer element has been scrolled to its bottom (including offset)
   */
  private _onIntersect(entries: IntersectionObserverEntry[]): void {
    if (entries[0].isIntersecting) {
      this._onBottomReached.emit();
    }
  }

  ngOnDestroy(): void {
    this._intersectionObserver.disconnect();
    this._mutationObserver.disconnect();
  }
}
