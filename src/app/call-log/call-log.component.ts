import { Component, OnInit } from '@angular/core';
import {DbmanagerService} from '../dbmanager.service';

@Component({
  selector: 'app-call-log',
  templateUrl: './call-log.component.html',
  styleUrls: ['./call-log.component.css']
})
export class CallLogComponent implements OnInit {

  constructor(private dbManager: DbmanagerService) { }

  ngOnInit() {
  }

}
