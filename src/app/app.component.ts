import { Component, OnInit } from '@angular/core';
import * as paper from 'paper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'paper-trial';

  constructor() {};

  ngOnInit() {
    paper.install( window );

  }
}
