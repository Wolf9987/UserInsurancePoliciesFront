import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { InsurancePolicy } from '../models/insurancePolicy';
import { User } from '../models/user';
import { MatDialog } from '@angular/material/dialog';
import { InsurancePolicyFormComponentComponent } from '../insurance-policy-form-component/insurance-policy-form-component.component';
import { InsurancePolicyService } from '../services/insurance-policy.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResult } from '../models/httpResult';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-details-component',
  templateUrl: './user-details-component.component.html',
  styleUrl: './user-details-component.component.css'
})
export class UserDetailsComponentComponent {
  // @Input() data: any; 
  // @Output() event: EventEmitter<any> = new EventEmitter<any>(); 
  public userDetails: User = new User();
  userId: number;
  userName : string;
  userEmail : string;
  public policyList:InsurancePolicy[]=[];
  dataSource:any;
  displayedColumns: string[] = ["policyNumber", "insuranceAmount", "startDate", "endDate", "action"];
  pipe: DatePipe;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });
  
  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }

  constructor(public userService:UserService, private dialogPolicyFormRef: MatDialog,
     private policyService: InsurancePolicyService,private toastr: ToastrService) {
      
      }

  ngOnInit(): void {    
    this.getPolicies();    
  }

  getPolicies(){
    this.userService.getPolicies(this.userService.data.userID).subscribe((data:HttpResult) =>{
      if(data.isSuccess)
        this.policyList=data.result;
      else
        this.toastr.error(data.message);
    },
    error=>{
      this.toastr.error("Failed to load data");
    });
  }

  editPolicy(id){
    this.Openpopup(id,"Edit Policy",InsurancePolicyFormComponentComponent);
  }

  addInsurancePolicy(){
    this.Openpopup(0,"Add New Policy",InsurancePolicyFormComponentComponent);
  }
  deletePolicy(policyId){
    if(confirm("Are you sure you want to delete the record?")){
    this.policyService.deletePolicy(policyId).subscribe((data:HttpResult) =>{
      if (data.isSuccess){
        this.toastr.success("deleted successfully");
        this.getPolicies();
      }
      else
      this.toastr.error(data.message);
    },
    error=>{
      this.toastr.error("Failed to delete");
    });
  }

  }

  applyFilter() {    
    var tempArr:InsurancePolicy[]=[];
    this.policyList.forEach((element)=>{
      var tt = ((new Date(element.startDate))<=this.toDate);
      if(((new Date(element.startDate))<=this.toDate) && ((new Date(element.startDate))>=this.fromDate)){
        tempArr.push(element);
      }
      this.policyList=tempArr;

    });
  }

  Openpopup(policyId: any, title: any,component:any) {
    var _popup = this.dialogPolicyFormRef.open(component, {
      width: '40%',
      data: {
        title: title,
        policyId: policyId
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.getPolicies();
    })
  }
}
