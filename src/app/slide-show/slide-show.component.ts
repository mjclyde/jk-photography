import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as meta from '../../assets/wide-images.json';

interface ImageInfo {
  width: number;
  height: number;
  url: string;
}

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit {

  @ViewChild('slideShowContainer') slideShowContainer: ElementRef;

  readonly visibleImageUrls: Observable<string[]>;

  private _visibleImages = new BehaviorSubject<ImageInfo[]>([]);
  private _allImages: ImageInfo[] = this.shuffle((meta as any).default);

  constructor() {
    this.visibleImageUrls = this._visibleImages.pipe(map((images) => images.map((image) => image.url)));
  }

  ngOnInit(): void {
    this._visibleImages.next(this._allImages);
  }

  private shuffle(array: ImageInfo[]): ImageInfo[] {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

}
