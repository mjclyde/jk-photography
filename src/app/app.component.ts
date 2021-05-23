import { SectionTitleComponent } from './components/section-title/section-title.component';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, merge, Observable, BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import * as tallImagesMeta from '../assets/tall-images.json';
import * as wideImagesMeta from '../assets/wide-images.json';
import { HeaderOption } from './header/header.component';
const WIDE_IMAGES = (wideImagesMeta as any).default;
const TALL_IMAGES = (tallImagesMeta as any).default;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('aboutRef') aboutRef: SectionTitleComponent;
  @ViewChild('pricingRef') pricingRef: SectionTitleComponent;

  bannerImageUrl: Observable<string>;
  showFullHeightHeader: Observable<boolean>;

  private _bannerImageUrl = new BehaviorSubject<string>('');
  private _sectionTitles: { [section: string]: SectionTitleComponent } = {};
  private _destroy = new Subject();

  constructor() {
    this.bannerImageUrl = this._bannerImageUrl.asObservable();
  }

  ngOnInit(): void {
    const isMobileSize = merge(
      [window.innerWidth],
      fromEvent(window, 'resize').pipe(
        map((event: any) => event.target.innerWidth),
      ),
    ).pipe(
      takeUntil(this._destroy),
      map((width) => width < 500),
      distinctUntilChanged(),
    );

    isMobileSize.subscribe((val) => {
      if (val) {
        this._bannerImageUrl.next(this.getRandomImage(TALL_IMAGES));
      } else {
        this._bannerImageUrl.next(this.getRandomImage(WIDE_IMAGES));
      }
    });

    const scrollAtTopOfPage =
      merge(
        [window.scrollY],
        fromEvent(window, 'scroll').pipe(map((event) => (event.target as any).scrollingElement.scrollTop)),
      ).pipe(
        takeUntil(this._destroy),
        map((scrollPosition) => scrollPosition < 100),
        distinctUntilChanged(),
      );

    this.showFullHeightHeader = combineLatest([isMobileSize, scrollAtTopOfPage]).pipe(
      map(([mobileSize, atTop]) => atTop && !mobileSize),
      distinctUntilChanged(),
    );

    this.showFullHeightHeader.subscribe((val) => console.log('%c Show Full Height Header', 'color: red', val));
  }

  ngOnDestroy(): void {
    this._destroy.next();
  }

  ngAfterViewInit(): void {
    this._sectionTitles['about'] = this.aboutRef;
    this._sectionTitles['pricing'] = this.pricingRef;
  }

  onHeaderOptionSelected(option: HeaderOption): void {
    if (this._sectionTitles[option]) {
      this._sectionTitles[option].scrollIntoView();
    }
  }

  private getRandomImage(images: Array<{ url: string }>): string {
    return images[Math.floor(Math.random() * images.length)].url;
  }

}
