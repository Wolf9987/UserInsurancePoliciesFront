import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InsurancePolicyService } from '../services/insurance-policy.service';
import { InsurancePolicy } from '../models/insurancePolicy';
import { Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResult } from '../models/httpResult';


@Component({
  selector: 'app-insurance-policy-form-component',
  templateUrl: './insurance-policy-form-component.component.html',
  styleUrl: './insurance-policy-form-component.component.css'
})
export class InsurancePolicyFormComponentComponent {
  
  inputdata: any;
  editdata: any;
  policyData:InsurancePolicy;
  userId: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<InsurancePolicyFormComponentComponent>,
  private builder: FormBuilder, private policyService: InsurancePolicyService,  private userService: UserService,
  private toastr: ToastrService){
    this.policyData = new InsurancePolicy();
    this.userId = this.userService.data.userID;
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    if(this.inputdata.policyId>0){
      this.setpopupdata(this.inputdata.policyId)
    }
  }

  myform = this.builder.group({
    policyNumber: ['', Validators.required],
    insuranceAmount: ['', Validators.required], 
    startDate: ['', [Validators.required,  Validators.pattern(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/)]],
    endDate: ['', [Validators.required,  Validators.pattern(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/)]]
  });
  

  setpopupdata(policyId: any) {
    this.policyService.GetPolicyByPolicyId(policyId).subscribe(item => {
      this.editdata = item;
      
      this.myform.setValue({
          policyNumber:this.editdata.result.policyNumber,
          insuranceAmount:this.editdata.result.insuranceAmount.toString(),
          startDate:formatDate(this.editdata.result.startDate, 'yyyy-MM-dd', 'en'),      
          endDate:formatDate(this.editdata.result.endDate, 'yyyy-MM-dd', 'en')});
    },
    error=>{
      this.toastr.error("Failed to load data");
    });
    
  }

  

  closepopup(){
    this.ref.close("from method");
  }

  SavePolicy(){
    this.updatePolicyDataObject();
    if (this.inputdata.title=="Add New Policy"){
    this.policyService.addPolicy(this.policyData).subscribe((data:HttpResult) => {
      if(data.isSuccess)
        this.closepopup();
      else
        this.toastr.error(data.message);
    },
    error=>{
      this.toastr.error("Failed to add data");
    });
  }
  else{
    this.policyService.updatePolicy(this.policyData).subscribe((data:HttpResult) => {
      if(data.isSuccess)
        this.closepopup();
      else
        this.toastr.error(data.message);
    },
    error=>{
      this.toastr.error("Failed to update data");
    });
  }
  }

  updatePolicyDataObject(){
    this.policyData.insuranceAmount = +this.myform.value.insuranceAmount;
    this.policyData.policyNumber = this.myform.value.policyNumber;
    this.policyData.startDate = this.myform.value.startDate;
    this.policyData.endDate = this.myform.value.endDate;
    this.policyData.userID =  this.userId;
    this.policyData.insurancePolicyID = this.inputdata.policyId;
  }

}
