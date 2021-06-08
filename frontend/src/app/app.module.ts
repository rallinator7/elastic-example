import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './tenant-view/login.component';
import { TenantSelectComponent } from './tenant-view/tenant-select/tenant-select.component';
import { TenantCreateComponent } from './tenant-view/tenant-create/tenant-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ClientViewComponent } from './dashboard/client-view/client-view.component';
import { MessageViewComponent } from './dashboard/message-view/message-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TenantSelectComponent,
    TenantCreateComponent,
    DashboardComponent,
    ClientViewComponent,
    MessageViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScrollingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
