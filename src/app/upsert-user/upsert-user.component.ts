import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResult } from '../models/httpResult';

@Component({
  selector: 'app-upsert-user',
  templateUrl: './upsert-user.component.html',
  styleUrl: './upsert-user.component.css'
})
export class UpsertUserComponent {
  inputdata: any;
  editdata: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<UpsertUserComponent>,
  private builder: FormBuilder, private userService: UserService,private toastr: ToastrService){  }

  ngOnInit(): void {
    this.inputdata = this.data;
    if(this.inputdata.userId>0){
      this.setpopupdata(this.inputdata.userId)
    }
  }
  myform = this.builder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  setpopupdata(userId: any) {
    this.userService.GetUserByUserId(userId).subscribe(item => {
      this.editdata = item;
      this.myform.setValue({
        name:this.editdata.result.name,
        email:this.editdata.result.email});
    });
  }

  SaveUser(){  
    if (this.inputdata.title=="Add New User"){
    this.userService.addUser(this.myform.value).subscribe((res:HttpResult)=> {
      if(res.isSuccess==true){
        this.toastr.success("Data added");
        this.closepopup();
      }
      else{
        
        this.toastr.error(res.message);
      }
    },
    error=>{
      this.toastr.error("Failed to add data");
    });
  }
  else{
    this.editdata.result.name = this.myform.value.name;
    this.editdata.result.email = this.myform.value.email;
    this.userService.updateCustomer(this.editdata.result).subscribe((res:HttpResult) => {
      if(res.isSuccess==true){
        this.toastr.success("Data updated");
        this.closepopup();
      }
      else{
        
        this.toastr.error(res.message);
      }
    },
    error=>{
      this.toastr.error("Failed to update data");
    });

  }
  }

  closepopup(){
    this.ref.close("from method");
  }

}
