import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { RailsComponent } from './rails/rails.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    RailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          path : 'customer',
          component : CustomerComponent
        },
        {
          path : 'rails',
          component : RailsComponent
        }
      ]
    )
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
