import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { SignupUserRequest } from '../../models/interfaces/User/SignupUserRequest';
import { AuthResquest } from '../../models/interfaces/Auth/AuthRequest';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy{
  private readonly destroy$:Subject<void> = new Subject();
  email: string='';
  password: string='';

  loginCard = true;
  loginAuth = false;

  loginForm = this.formBuilder.group({
    email:['', Validators.required],
    password:['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    email:['', Validators.required],
    password:['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder,private userService: UserService,private cookService: CookieService,private messageService: MessageService,private router: Router){}

    loginWitnGoogle() {
        this.userService.signInWithGoogle().then((response:any)=>{
          console.log(response.user.displayName);
          this.cookService.set('USER_INFOR', response?.credential.idToken);
          this.loginForm.reset();
          this.router.navigateByUrl('/dashboard')
          this.messageService.add({
            severity:'success',
            summary:'Sucesso',
            detail: `Bem vindo de volta ${response?.user.displayName}!`,
            life: 2000
          })
        }).catch((error:any)=>{
          this.messageService.add({
            severity:'success',
            summary:'Opa!',
            detail: 'Erro ao login, verifique email ou senha!',
            life: 2000
          })
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
          this.router.navigateByUrl('/dashboard')
          this.messageService.add({
            severity:'success',
            summary:'Sucesso',
            detail: `Bem vindo de volta ${this.email}!`,
            life: 2000
          })
        }).catch((error:any)=>{
          this.messageService.add({
            severity:'success',
            summary:'Opa!',
            detail: 'Erro ao login, verifique email ou senha!',
            life: 2000
          })
          console.log(error);
        })

      }

    }

    onSubmitSignupFire(): void{

      if(this.signupForm.value && this.signupForm.valid){

        this.userService.registerWithEmailPassword(this.signupForm.value as AuthResquest).then((response:any)=>{
          this.cookService.set('USER_INFOR', response?.user._delegate.accessToken);

          this.loginForm.reset();
          this.loginCard = true;
          this.messageService.add({
            severity:'success',
            summary:'Sucesso',
            detail: `Usuário criado com sucesso`,
            life: 2000
          })
        }).catch((error:any)=>{
          this.messageService.add({
            severity:'success',
            summary:'Opa!',
            detail: 'Erro ao criar usuário',
            life: 2000
          })
          console.log(error);
        })

      }

    }

  onSubmitSignupForm(): void {

    console.log("dados do formulario", this.signupForm.value);

    if(this.signupForm.value && this.signupForm.valid){
      this.userService.signupUser(this.signupForm.value as SignupUserRequest)
      .subscribe({
        next:(response)=>{
          if(response){
            this.signupForm.reset();
            this.loginCard = true;

            this.messageService.add({
              severity:'success',
              summary:'Sucesso',
              detail: 'Usuário criado com sucesso',
              life: 2000
            })

          }
        },
        error:(err) =>{
          this.messageService.add({
            severity:'success',
            summary:'Sucesso',
            detail: 'Erro ao criar usuário',
            life: 2000
          })
          console.log(err)}
      })
    }
  }

  // "Memory Leak"  evitar vazamento de memória
  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }

}
