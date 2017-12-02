import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import {Customer} from './customer';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  rForm: FormGroup; 
  post: any;
  customer: Customer;
  customerResponse: CustomerResponse;
  isTable = true;
  isForm = false;

  titleAlert = 'This field is required';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.rForm = fb.group({
      'name': [null, Validators.required],
      'customerEmail': [null, Validators.email],
      'identifyNumber': [null,
        Validators.compose([Validators.pattern('^[0-9]+$'),
        Validators.required])],
      'costumerPhone': [null,
        Validators.compose([Validators.pattern('^[0-9]+$'),
        Validators.required])],
      'validate': '',
      'customerId':'',


    });
  }

  ngOnInit() {
    this.getAllCustomer();
  }

  addPost(post) {
    this.customer = new Customer();
    this.customer.name = post.name;
    this.customer.customerEmail = post.customerEmail;
    this.customer.identifyNumber = post.identifyNumber;
    this.customer.costumerPhone = post.costumerPhone;
    this.customer.customerId = post.customerId;
    console.log(this.customer);
    const req = this.http.post('http://localhost:8080/customer/save', this.customer).subscribe(
     res => {
       console.log(res);
       window.alert('sukses tambah data');
       this.isTable = true;
       this.isForm = false;
       this.getAllCustomer();

     },
     err => {
       console.log('data gagal dikirim');
     }
    );
    this.isTable = true;
    this.isForm = false;
  }

  update(customerId) {
    this.isTable = false;
    this.isForm = true;
    this.rForm.patchValue({
      name: customerId.name,
      customerEmail: customerId.customerEmail,
      identifyNumber: customerId.identifyNumber,
      costumerPhone: customerId.costumerPhone,
      customerId: customerId.customerId
    });
    console.log('id = ' + customerId);
  }
  deleteCustomer(customerId) {
    const r = confirm('apakah anda delete customer');
    if (r===true){
      const req = this.http.post('http://localhost:8080/customer/delete', this.customer).subscribe(
        res => {
          console.log(res);
          window.alert('sukses hapus data');
          this.isTable = true;
          this.isForm = false;
          this.getAllCustomer();
   
        },
        err => {
          console.log('data gagal dikirim');
        }
      );
    } else {
      console.log('delete data cancel')
    }
  }

  getAllCustomer(): void {
this.http.get<CustomerResponse>('http://localhost:8080/customer/getCustomer').subscribe(
data => {
  console.log('success hit');
  this.customerResponse = data;
},
(err: HttpErrorResponse) => {
  if (err.error instanceof Error) {
    console.log('An error occured:', err.error.message);
  } else {
    console.log(`backend returned code ${err.status}, body was: ${err.error}`);
  }
}
);

  }
  showForm(): void{
    this.isForm = true;
    this.isTable = false;
  } 
}