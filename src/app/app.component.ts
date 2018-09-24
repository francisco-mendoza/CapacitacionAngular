import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { first } from '../../node_modules/rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ){}

  ngOnInit() 
  {

      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() 
  {
    this.submitted = true;
    this.loading = true;
    this.userService.login(this.f.username.value , this.f.password.value)
    .pipe(first())
    .subscribe(
        data => 
        {
            this.loading = false;
            this.error = "Usuario logeado";
           
        },
        error => {
            console.log(error);
            this.error = "ERROR:" + error.statusText;
            this.loading = false;
        });
  }

}
