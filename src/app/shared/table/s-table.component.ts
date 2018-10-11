import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 's-table',
  templateUrl: './s-table.component.html'
})
export class STableComponent implements OnInit {

  @Input() data: TPost;

  public testVluae = '111111';
  constructor() {
    console.log();

   }



}
