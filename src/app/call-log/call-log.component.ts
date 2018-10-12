import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';

@Component({
  selector: 'app-call-log',
  templateUrl: './call-log.component.html',
  styleUrls: ['./call-log.component.css']
})
export class CallLogComponent implements OnInit {

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
      console.log(this.storageService.getAllCallLog());
  }

}
