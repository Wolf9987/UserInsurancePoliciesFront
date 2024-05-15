import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpsertUserComponent } from '../upsert-user/upsert-user.component';
import { ToastrService } from 'ngx-toastr';
import { HttpResult } from '../models/httpResult';


@Component({
  selector: 'app-user-list-component',
  templateUrl: './user-list-component.component.html',
  styleUrl: './user-list-component.component.css'
})
export class UserListComponentComponent {

  public usersList:any;
  displayedColumns: string[] = ["userID", "name", "email", "action"];
  
 
  constructor(private userService:UserService, private router:Router,
    private dialogUserFormRef: MatDialog, private toastr: ToastrService) { 
    this.getUsers();
  }

  ngOnInit(): void {
  }

  getUsers() {
    this.userService.getUsers().subscribe((data:HttpResult) =>{
      if(!data.isSuccess){
        this.toastr.error(data.message);
      }
      else
        this.usersList=data.result;
      
    },
    error=>{
      this.toastr.error("Failed to load users");
    });
  }

  editUser(userId){
    this.Openpopup(userId,"Edit User",UpsertUserComponent);
  }

  deleteUser(userId){
    if(confirm("Are you sure you want to delete the record?")){
      this.userService.deleteUser(userId).subscribe((data:HttpResult)=>{
        if (data.isSuccess){
          this.toastr.success("deleted successfully");
          this.getUsers();
        }
        else
          this.toastr.error(data.message);
      },
      error=>{
        this.toastr.error("Failed to delete");
      });
    }
    
  }

  detailUser(element: User){
    this.userService.setData(element);
  }

  addcustomer(){
    this.Openpopup(0,"Add New User",UpsertUserComponent);
    
  }

  Openpopup(userId: any, title: any,component:any) {
    var _popup = this.dialogUserFormRef.open(component, {
      width: '30%',
      data: {
        title: title,
        userId: userId
      }
    });
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      this.getUsers();
    })
  }

  public parentMethod(event: any): void { 

    console.log('Event received from child:', event);
    
    }         

}


