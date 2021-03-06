import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AppSettings} from '../../app.settings';

import 'style-loader!./login.scss';

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {

  public form:FormGroup;
  public phone:AbstractControl;
  public submitted:boolean = false;
  public callback:boolean = false;
  public access_token:string;

  constructor(fb:FormBuilder, route: ActivatedRoute, private router:Router) {
    this.form = fb.group({
      'phone': ['', Validators.compose([Validators.required])]
    });

    this.phone = this.form.controls['phone'];
    this.access_token = route.snapshot.queryParams["access_token"];

    if(this.access_token){
      this.callback = true;
      this.doLogin(this.access_token);
    }
  }

  /** Submitting the phone number and redirect to MIG for authentication */
  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid){
        window.location.href = AppSettings.getAuthUrl(this.phone.value);
    }
  }

  /** Send the code and get the access token */
  public doLogin(token:string):void{
    //save token to localstorage and redirect to dashboard
    localStorage.setItem('access_token', token);
    this.router.navigate(['/pages/dashboard']);
  }
}
