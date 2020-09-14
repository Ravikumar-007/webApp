import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  registerForm: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
   image = new FormControl('', [
    Validators.required
  ]);
  // role = new FormControl('', [
  //   Validators.required
  // ]);

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      image:this.image
      // role: this.role
    });
  }


  setClassUsername(): object {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }

  setClassEmail(): object {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }

  setClassPassword(): object {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

//UPload file
//   fileProgress(fileInput: any) {
//     if (fileInput.files && fileInput.files[0]) {
//     this.fileData = <File>fileInput.target.files[0];
//     this.preview();
//     }
// }


fileProgress(input) {
  console.log(input.files);
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
      console.log(this.previewUrl);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

  register(): void {
    console.log("image", this.image);
    console.log(this.registerForm.value);
    this.registerForm.value.previewUrl = this.previewUrl;
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['/login']);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }
}
