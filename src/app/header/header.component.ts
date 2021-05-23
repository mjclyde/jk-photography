import { Subject } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output, ElementRef } from '@angular/core';

export type HeaderOption = 'about' | 'pricing' | 'testimonials' | 'contact';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent implements OnInit {

  @Input() fullHeight = true;

  @Output() optionSelected = new Subject<HeaderOption>();

  constructor() { }

  ngOnInit(): void {}

}
