import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class InsurancePolicyService {

  constructor(private baseService:BaseService) { }

  addCustomer(data:any){
    console.log(data)
    //return this.http.post("http://localhost:3000/customer",data);
  }
  addPolicy(data:any){
    return this.baseService.post("insurancepolicies", data);
  }

  updatePolicy(data:any){
    return this.baseService.put("insurancepolicies", data);
  }

  deletePolicy(id){
    return this.baseService.delete(`insurancepolicies/${id}`);
  }

  updateCustomer(data:any){
    console.log(data)
    //return this.http.put("http://localhost:3000/customer",data);
  }
  GetPolicyByPolicyId(policyId){
    return this.baseService.get(`insurancepolicies/${policyId}`); 
  }
}
