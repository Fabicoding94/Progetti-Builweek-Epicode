import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  isFormValid!: boolean;
  allUsers: User[] = [];

  constructor(
    private authSrv: AuthService,
    private userSrv: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      username: new FormControl(null, [Validators.required], this.usernameValidator),
      avatar: new FormControl(null, Validators.required),
      email: new FormControl(null,[ Validators.required], this.emailValidator),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  checkValidity(input:string):boolean{
    return (this.form.get(input)?.invalid
      && this.form.get(input)?.touched
      && this.form.get(input)?.dirty) || false
  }

  //async username validator
  usernameValidator = (control:AbstractControl) => {
    return new Promise<ValidationErrors | null>((resolve) => {
      this.userSrv.getAllUsers()
      .subscribe(users => {
        for (let user of users) {
          if (user.username == control.value) {
            resolve ({usernameIsTaken:true})
          }
        }
        resolve(null)
      })
    })
  }

  //async email validator
  emailValidator = (control:AbstractControl) => {
    return new Promise<ValidationErrors | null>((resolve) => {
      this.userSrv.getAllUsers()
      .subscribe(users => {
        for (let user of users) {
          if (user.email == control.value) {
            resolve ({emailIsTaken:true})
          }
        }
        resolve(null)
      })
    })
  }

  submit() {
    if (this.form.valid) {
      this.authSrv
        .register(
          new User(
            this.form.value.name,
            this.form.value.lastname,
            this.form.value.username,
            this.form.value.avatar,
            this.form.value.email,
            this.form.value.password
          )
        )
        .subscribe((res) => {
          this.authSrv.saveAccessData(res);
          this.router.navigate(['/home']);
        });
    } else {
      console.log('errore form non valido');
      this.isFormValid = false;
    }
  }
}
