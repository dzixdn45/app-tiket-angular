import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import {Rails} from './rails';

@Component({
  selector: 'app-rails',
  templateUrl: './rails.component.html',
  styleUrls: ['./rails.component.css']
})
export class RailsComponent implements OnInit {
  jForm: FormGroup;
  post: any;
  rails: Rails;
  isTable1 = false;
  isForm2 = true;
  titleAlert = 'This field is required';
  constructor(private fb: FormBuilder) {
    this.jForm = fb.group({
      'railsId': [null,
        Validators.compose([Validators.pattern('^[0-9]+$'),
        Validators.required])],
      'railsName': [null, Validators.required],
      'railsCapacity': [null,
        Validators.compose([Validators.pattern('^[0-9]+$'),
        Validators.required])],
      'validate': ''
    });
   }

  ngOnInit() {
  }
  addPost(post) {
    this.rails = new Rails();
    this.rails.railsId = post.railsId;
    this.rails.railsName = post.railsName;
    this.rails.railsCapacity = post.railsCapacity;
    console.log(this.rails);
    this.isTable1 = true;
    this.isForm2 = false;
  }
}
