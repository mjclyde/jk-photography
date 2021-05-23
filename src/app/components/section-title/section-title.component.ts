import { Component, Input, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {}

  scrollIntoView(): void {
    this.el.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

}
