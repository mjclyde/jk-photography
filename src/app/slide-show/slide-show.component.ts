import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit, AfterViewInit {



  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const docs = document.getElementById('slide-show').children;
    console.log(docs);
  }

}
