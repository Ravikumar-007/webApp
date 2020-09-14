import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  user: User;
  isLoading = true;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(private auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  fileProgress(input) {
    console.log(input.files);
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.previewUrl = e.target.result;
        // console.log(this.previewUrl);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  getUser(): void {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  save(user: User): void {
    this.userService.editUser(user).subscribe(
      res => {
        this.toast.setMessage('account settings saved!', 'success');
        this.auth.currentUser = user;
      },
      error => console.log(error)
    );
  }

}
