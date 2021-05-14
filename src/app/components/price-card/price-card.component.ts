import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-50%)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'})),
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'translateY(0)'}),
        animate('300ms ease-out', style({opacity: 0, transform: 'translateY(-50%)'})),
      ]),
    ])
  ]
})
export class PriceCardComponent implements OnInit {
  @Input() img: string;
  @Input() header: string;
  @Input() subHeader: string;

  mouseOn$ = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
