import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  
  // private userData = new Subject<User>();
  // public userData$ = this.userData.asObservable();
  public data:User;

  constructor(private baseService:BaseService) { }

  public getUsers()
  {
    return this.baseService.get("users"); 
  }

  public GetUserByUserId(userId){
    return this.baseService.get(`users/${userId}`); 
  }

  public getPolicies(userId:number)
  {
    return this.baseService.get(`insurancepolicies/GetPoliciesByUser/${userId}`); 
  }

  addUser(user:any) {
    return this.baseService.post("users", user);
  }

  updateCustomer(user:any){
    return this.baseService.put("users", user);
  }

  deleteUser(Id){
    return this.baseService.delete(`users/${Id}`);
  }

  // public getData(): Observable<any> { 
  //   return this.data$.asObservable();
  //  } 
    
    public setData(value: User) {
      //this.userData.next(data);
      this.data = value;
    }
}
