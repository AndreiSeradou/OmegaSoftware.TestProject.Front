import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscriptions } from 'src/app/Models/subscriptionModel';

@Injectable({
  providedIn: 'root'
})
export class SibscriptionsService {

  private readonly baseURL:string="http://localhost:8090/";

  constructor(private httpClient:HttpClient) { }

  public GetAllSubscriptions()
  {
    let token = localStorage.getItem("token");

    const headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return  this.httpClient.get<Subscriptions[]>(this.baseURL+"Subscription/all",{headers:headers});
  }

  public Subscribe(model : Subscriptions)
  {
    let token = localStorage.getItem("token");
    let userName = localStorage.getItem("name");

    const headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body={
      name:model.name,
      description:model.description,
      cronParams:model.cronParams,
      lastRunTime:model.lastRunTime,   
      userName:userName
    }

    return  this.httpClient.post<boolean>(this.baseURL+"Subscription/subscribe",body,{headers:headers});
  }

  public UpdateSubscription(model : Subscriptions)
  {
    let token = localStorage.getItem("token");
    let userName = localStorage.getItem("name");

    const headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body={
      name:model.name,
      description:model.description,
      cronParams:model.cronParams,
      lastRunTime:model.lastRunTime,   
      userName:userName
    }
    
    return  this.httpClient.put<boolean>(this.baseURL+"Subscription/update",body,{headers:headers});
  }

  public Unsubscribe(model : Subscriptions)
  {
    let token = localStorage.getItem("token");
    let userName = localStorage.getItem("name");

    const headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'name': `${model.name}`,
      'description': `${model.description}`,
      'cronParams': `${model.cronParams}`,
      'lastRunTime': `${model.lastRunTime}`,
      'userName': `${model.userName}`,
    });

    const body={
      name:model.name,
      description:model.description,
      cronParams:model.cronParams,
      lastRunTime:model.lastRunTime,   
      userName:userName
    }
    return  this.httpClient.delete<boolean>(this.baseURL+"Subscription/unsubscribe",{headers:headers});
  }
}
