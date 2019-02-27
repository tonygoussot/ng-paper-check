import { Component, OnInit } from '@angular/core';
import * as paper from "paper";
import { Path, Point, view } from 'paper';

@Component({
  selector: 'app-paper-canvas', templateUrl: './paper-canvas.component.html', styleUrls: [ './paper-canvas.component.scss' ]
})
export class PaperCanvasComponent implements OnInit {
  private width;
  private height;
  private center;
  private points = 10;
  private smooth = true;
  private path;
  private mousePos;
  private pathHeight;

  constructor() {
  }

  ngOnInit() {
    paper.setup('paperCanvas');
    this.initializePath();
  }

  initializePath() {
    this.path = new Path();
    this.mousePos = paper.view.center
    this.pathHeight = this.mousePos.y;

    this.path.fillColor = 'black';
    this.center = view.center;
    this.width = view.size.width;
    this.height = view.size.height / 2;
    this.path.segments = [];
    this.path.add(view.bounds.bottomLeft);

    for (let i = 1; i < this.points; i++) {
      const point = new Point(this.width / this.points * i, this.center.y);
      this.path.add(point);
    }
    this.path.add(view.bounds.bottomRight);
    this.path.fullySelected = true;
    view.onFrame = this.onFrame.bind(this);
    view.onMouseMove = this.onMouseMove.bind(this);
    view.onMouseDown = this.onMouseDown.bind(this);
    view.onResize = this.onResize.bind(this);
  }

  onFrame(event) {
    this.pathHeight += (this.center.y - this.mousePos.y - this.pathHeight) / 10;
    for (let i = 1; i < this.points; i++) {
      const sinSeed = event.count + (i + i % 10) * 100;
      const sinHeight = Math.sin(sinSeed / 200) * this.pathHeight;
      const yPos = Math.sin(sinSeed / 100) * sinHeight + this.height;
      this.path.segments[ i ].point.y = yPos;
    }
    if (this.smooth) {
      this.path.smooth({ type: 'continuous' });
    }
  }

  onMouseMove(event) {
    this.mousePos = event.point;
  }

  onMouseDown(event) {
    this.smooth = !this.smooth;
    if (!this.smooth) {
      // If smooth has been turned off, we need to reset
      // the handles of the path:
      for (var i = 0, l = this.path.segments.length; i < l; i++) {
        const segment = this.path.segments[ i ];
        segment.handleIn = segment.handleOut = null;
      }
    }
  }

  // Reposition the path whenever the window is resized:
  onResize(event) {
    this.initializePath();
  }
}
