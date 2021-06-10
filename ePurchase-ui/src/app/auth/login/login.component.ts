import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/shared/session-storage.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { paths } from '../../shared/path';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  applicationPaths: any;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder,
    private router: Router, private sharedDataService: SharedDataService,
    private sessionStorageService: SessionStorageService) {
    this.applicationPaths = paths;
    this.createForm();
  }

  ngOnInit(): void {}

  createForm(){
    this.loginForm = this.fb.group({
      email: ['lucky@gmail.com', [Validators.email, Validators.required]],
      password: ['lucky', Validators.required]
    })
  }

  login(){
    let userCreds = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.authService.login(userCreds).subscribe(
      data =>{
        this.setLoginSessions(data);
        this.router.navigate(['/product']);
      },
      err =>{ console.log(err);}
    );
  }

  setLoginSessions(data: any){
    this.sessionStorageService.saveToken(data.token);
    this.sessionStorageService.setUserKey(data.userData?.user_id);
    this.sharedDataService.updateisUserLoggedIn(true);
    this.sharedDataService.updateUserLoggedInData(data.userData);
  }

}
