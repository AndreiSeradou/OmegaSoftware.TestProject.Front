import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ISubscriptions } from 'src/app/interfaces/subscription.interface';
import { SibscriptionsService } from 'src/app/services/sibscriptions/sibscriptions.service';


@Component({
  selector: 'app-user-create-subscription',
  templateUrl: './user-create-subscription.component.html',
  styleUrls: ['./user-create-subscription.component.scss']
})
export class UserCreateSubscriptionComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private subService:SibscriptionsService) { }

  public createSubForm=this.formBuilder.group({
    name:['',[Validators.required]],
    description:['',[Validators.required]],
    cronParams:['',[Validators.required]],
    apiParams:['',[Validators.required]],
    apiName:['',[Validators.required]],
  })

  ngOnInit(): void {
  }

  onSubmit(){
    const apiName=this.createSubForm.controls["apiName"].value;
    const name=this.createSubForm.controls["name"].value;
    const description=this.createSubForm.controls["description"].value;
    const cronParams=this.createSubForm.controls["cocronParams"].value;
    const apiParams=this.createSubForm.controls["apiParams"].value;
    const userName=localStorage.getItem("name");

    let sub : ISubscriptions = {
      name:name,
      description:description,
      userName:userName,
      cronParams:cronParams,
      apiParams:apiParams,
      apiName:apiName,
      id:0,
      lastRunTime:""
    }

    this.subService.Subscribe(sub).subscribe(data => {

      if (data) {
        alert("Successfully create");
        console.log(data);
        location.reload();
      }
      else
      {
        alert("Error create");
      }
      })
      }

}

