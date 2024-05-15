import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponentComponent } from './user-list-component/user-list-component.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material-module';
import { InsurancePolicyFormComponentComponent } from './insurance-policy-form-component/insurance-policy-form-component.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponentComponent } from './user-details-component/user-details-component.component';
import { UpsertUserComponent } from './upsert-user/upsert-user.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponentComponent,
    MenuBarComponent,
    InsurancePolicyFormComponentComponent,
    UserDetailsComponentComponent,
    UpsertUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
