import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm=this.formBuilder.group({
    fullName:['',[Validators.required]],
    email:['',[Validators.email,Validators.required]],
    password:['',Validators.required]
  })
  constructor(private formBuilder:FormBuilder, private authService:AuthUserService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
   const fullName=this.registerForm.controls["fullName"].value;
   const email=this.registerForm.controls["email"].value;
   const password=this.registerForm.controls["password"].value;
   this.authService.register(fullName,email,password).subscribe((data)=>{
    console.log("response",data.token);
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
   },error=>{
    console.log("error",error);
   })
  }
}
