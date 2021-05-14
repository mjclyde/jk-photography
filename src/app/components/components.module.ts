import { SectionTitleComponent } from './section-title/section-title.component';
import { NgModule } from '@angular/core';
import { PriceCardComponent } from './price-card/price-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    BrowserAnimationsModule,
  ],
  declarations: [
    SectionTitleComponent,
    PriceCardComponent,
  ],
  exports: [
    SectionTitleComponent,
    PriceCardComponent,
  ]
})
export class ComponentsModule { }
