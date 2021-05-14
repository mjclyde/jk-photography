import { Component } from '@angular/core';
import * as tallImagesMeta from '../assets/tall-images.json';
import * as wideImagesMeta from '../assets/wide-images.json';
const WIDE_IMAGES = (wideImagesMeta as any).default;
const TALL_IMAGES = (tallImagesMeta as any).default;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  bannerImageUrl = WIDE_IMAGES[Math.floor(Math.random() * WIDE_IMAGES.length)].url;

}
