import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import {Customer} from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  rForm: FormGroup;
  post: any;
  customer: Customer;
  isTable = false;
  isForm = true;

  titleAlert = 'This field is required';

  constructor(private fb: FormBuilder) {
    this.rForm = fb.group({
      'customerName': [null, Validators.required],
      'customerEmail': [null, Validators.email],
      'identityNumber': [null,
        Validators.compose([Validators.pattern('^[0-9]+$'),
        Validators.required])],
      'customerPhoneNumber': [null,
        Validators.compose([Validators.pattern('^[0-9]+$'),
        Validators.required])],
      'validate': ''
    });
  }

  ngOnInit() {
  }

  addPost(post) {
    this.customer = new Customer();
    this.customer.customerName = post.customerName;
    this.customer.customerEmail = post.customerEmail;
    this.customer.identityNumber = post.identityNumber;
    this.customer.customerPhoneNumber = post.customerPhoneNumber;
    console.log(this.customer);
    this.isTable = true;
    this.isForm = false;
  }
}