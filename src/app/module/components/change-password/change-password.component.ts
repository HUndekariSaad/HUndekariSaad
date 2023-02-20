import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api-service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public ChangePasswordForm!: FormGroup;
  public ResetPasswordForm!: FormGroup;
  public submitted:boolean = false;
  public isSubmitted:boolean = false;
 public isAddMode!: boolean
  public id!: number;
  Name: any;
  City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];

  constructor(public _ApiService:ApiService,private router: Router) { }

  ngOnInit() {
    this.ChangePasswordForm = new FormGroup ({
      username:new FormControl('',[Validators.required]),
      newPassword:new FormControl('',[Validators.required]),
      currentPassword:new FormControl('',[Validators.required]),
    })

    this.ResetPasswordForm = new FormGroup ({
      newPassword:new FormControl('',[Validators.required]),
      username:new FormControl('',[Validators.required]),
    })
  }



  get f() {
    return this.ChangePasswordForm.controls;
  }


  OnSubmit(){
    this.submitted = true;
    if(this.ChangePasswordForm.invalid){return
    }
    this.ChangePasswordUpdate();
  }

  ChangePasswordUpdate(){
    this._ApiService.ChangePasswordUpdate(this.ChangePasswordForm.value).subscribe((response)=>{
      this.router.navigateByUrl('admin/changepassword');
      Swal.fire("Success!", "Change Password successfully!","success");
      this.ChangePasswordForm.reset();
      this.ChangePasswordForm.controls['username'].setErrors(null);
      this.ChangePasswordForm.controls['newPassword'].setErrors(null);
      this.ChangePasswordForm.controls['currentPassword'].setErrors(null);
    })
  }

  Delete(){
    this.ChangePasswordForm.reset();
    this.ChangePasswordForm.controls['username'].setErrors(null);
    this.ChangePasswordForm.controls['newPassword'].setErrors(null);
    this.ChangePasswordForm.controls['currentPassword'].setErrors(null);
  }

   // Validation_Change_Password_Form
 get s() {
  return this.ResetPasswordForm.controls;
}
 // Submit_Change_Password_Form
  OnSubmitResetPasswordForm(){
    this.isSubmitted = true;
    if(this.ResetPasswordForm.invalid){return
    }
    this.ResetPasswordUpdate()
  }
  ResetPasswordUpdate(){
    this._ApiService.ResetPassword(this.ResetPasswordForm.value).subscribe((response)=>{
      this.router.navigateByUrl('admin/changepassword');
      Swal.fire("Success!", "Password Update successfully!","success");
      this.ResetPasswordForm.reset();
      this.ResetPasswordForm.controls['username'].setErrors(null);
      this.ResetPasswordForm.controls['newPassword'].setErrors(null);
    })
  }


  Deletes(){
    this.ResetPasswordForm.reset();
    this.ResetPasswordForm.controls['username'].setErrors(null);
    this.ResetPasswordForm.controls['newPassword'].setErrors(null);
  }


  changeCity(e: any) {
    this.Name?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

}
