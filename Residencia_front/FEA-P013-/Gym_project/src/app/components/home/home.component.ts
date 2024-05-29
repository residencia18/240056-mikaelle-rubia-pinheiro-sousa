
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthResquest } from '../../../app/types/AuthResquest';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    FontAwesomeModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  private readonly destroy$:Subject<void> = new Subject();
  email: string='';
  password: string='';

  loginCard = true;
  loginAuth = false;

  loginForm!: FormGroup;
  signupForm!: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private cookService: CookieService,
    private router: Router,
    private userService:UserService){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required],
    });

    this.signupForm = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    });
  }

  loginWitnGoogle() {
    this.userService.signInWithGoogle().then((response:any)=>{
      console.log(response.user.displayName);
      this.cookService.set('USER_INFOR', response?.credential.idToken);
      this.loginForm.reset();
      this.router.navigateByUrl('/getUnits')
    }).catch((error:any)=>{

      console.log(error);
    });
}

onSubmitLoginFire():void {
  console.log("dados do formulario", this.loginForm.value);
  if(this.loginForm.value && this.loginForm.valid){
    this.email = this.loginForm.value.email || '';
    this.userService.signInWithEmailPassword(this.loginForm.value as AuthResquest).then((response:any)=>{
      this.cookService.set('USER_INFOR', response?.user._delegate.accessToken);
      this.loginForm.reset();
      alert('Login bem-sucedido! Bem-vindo de volta');
      this.router.navigateByUrl('/getUnits')
    }).catch((error:any)=>{

      console.log(error);
    })
  }
}

onSubmitSignupFire(): void{

  if(this.signupForm.value && this.signupForm.valid){

    this.userService.registerWithEmailPassword(this.signupForm.value as AuthResquest).then((response:any)=>{
      this.cookService.set('USER_INFOR', response?.user._delegate.accessToken);
      alert('Sua conta foi criada com sucesso! Bem-vindo à nossa comunidade!');
      this.loginForm.reset();
      this.loginCard = true;
    }).catch((error:any)=>{
      console.log(error);
    })
  }
}

ngOnDestroy(): void{
  this.destroy$.next();
  this.destroy$.complete();
}


}
