import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponentComponent } from './user-list-component/user-list-component.component';
import { InsurancePolicyFormComponentComponent } from './insurance-policy-form-component/insurance-policy-form-component.component';
import { UserDetailsComponentComponent } from './user-details-component/user-details-component.component';

const routes: Routes = [
  {path:'',component:UserListComponentComponent},
  // {path:'insurancePolicies',component:InsurancePolicyFormComponentComponent},
  {path:'userDetails',component:UserDetailsComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
