import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm=this.formBuilder.group({
    email:['',[Validators.email,Validators.required]],
    password:['',Validators.required]
  })
  constructor(private formBuilder:FormBuilder, private authService:AuthUserService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const email=this.loginForm.controls["email"].value;
    const password=this.loginForm.controls["password"].value;
    this.authService.login(email,password).subscribe(data => {
      console.log(data.name)
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("role", data.role);
        if (data.role == "User")
        {
          this.router.navigateByUrl('user-subscriptions');
        }
        else
        {
          this.router.navigateByUrl('administration-get-users');
        }
      }
    })
   }
}
