import { Component, OnInit } from '@angular/core';
import { paths } from '../../shared/path';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  applicationPaths: any;
  constructor() {
    this.applicationPaths = paths;
  }

  ngOnInit(): void {
  }

}
