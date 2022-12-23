import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  formIsValid!: boolean;
  userNameParam:string = this.authSrv.isUserLogged() ? this.authSrv.getLoggedUser().slug : '';

  constructor(private authSrv: AuthService, private router:Router) { }

  ngOnInit(): void {
    if(this.authSrv.isUserLogged()){
      this.router.navigate(['/home'])
    }else{
      this.form = new FormGroup({
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, [Validators.required, Validators.minLength(5)])
      })
    }

  }

  login(){
    if(this.form.valid){
      this.authSrv.login(this.form.value)
      .subscribe(res => {
        this.authSrv.saveAccessData(res)
        this.router.navigate(['/home']);
      })
    }else{
      this.formIsValid = false;
    }
  }
}
