import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {


  public title = 'demo';

  constructor() {
  }

  public ngOnInit(): void {
  }
}
