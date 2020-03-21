import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'name': new FormControl(null, Validators.required, this.testValidator),
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('critical')
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  // testValidator(control: FormControl): {[s: string]: boolean} {
  //   if (control.value == 'Test') {
  //     return {'nameIsForbidden': true}
  //   }
  //   return null;
  // }

  testValidator(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
      if (control.value == 'Test') {
       resolve({'nameIsForbidden': true});
      }
      resolve(null);      
      }, 1000);
    });
  }
}
