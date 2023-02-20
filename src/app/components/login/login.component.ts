import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api-service/api.service';
import { Login } from 'src/app/modules/login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!:FormGroup;
  public login!:Login
 submitted: boolean = false;
 hasError: boolean = false;
 model:any;

 isLocalValue:boolean=false;

  constructor(public _ApiService:ApiService, public router:Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required,Validators.minLength(5)]),
      // user_role: new FormControl('coordinator'),
      })

      // debugger;
      // var getValue=localStorage.getItem('roles');
      // if(getValue=='ROLE_ADMIN' || getValue=='ROLE_MEMBER'){
      //   alert("ROLE_ADMIN");
      //   this.isLocalValue=true;
      // }
      // console.log(getValue);
  }


  get f() {
    return this.loginForm.controls;
  }

  submit() {
    this.submitted = true;
    this.hasError = true;
     if (this.loginForm.invalid) {
     return;
     }
     else{
      this.hasError = false;
      this.submitted = false;
        this.loginUser();
     }
    //  if(this.isLocalValue==true){
    //   this.submitted = false;
    //  }
    //  else {

    //  }

    //       if(localStorage.getItem('roles') == '' ){
    //   console.log('==========',localStorage.getItem('roles'))
    //   return;
    //  }


  }


  loginUser(){
    this._ApiService.PostLoginDetails(this.loginForm.value).subscribe(response => {
        localStorage.setItem('username',response.username),
        localStorage.setItem('password',response.password),
        localStorage.setItem('token',response.token),
        localStorage.setItem('roles',response.roles),
        localStorage.getItem('roles');
        if(response.roles=="ROLE_ADMIN" || response.roles=="ROLE_MEMBER"){
          this.router.navigate(['admin/dashboard'])
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Bad credentials!"
          })
        }
    this.hasError = false;
  },
  err => {
    // Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: "Something Went Wrong"
    // })
    this.hasError = true;
  });
    // this._ApiService.PostLoginDetails(this.loginForm.value).subscribe((response) => {
    //   debugger;
    //   if(response > 0) {
    //     localStorage.setItem('username',response.username),
    //     localStorage.setItem('password',response.password),
    //     localStorage.setItem('token',response.token),
    //     localStorage.setItem('roles',response.roles),
    //     this.router.navigate(['admin/dashboard'])
    //     this.hasError = true;
    //     Swal.fire("Success!", "Login successfully!","success")
    //   }else
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: "Something Went Wrong"
    //   })
  //})

  // Swal.fire("Success!", "Login successfully!","success")
  // this.router.navigate(['admin/reports'])
}



GetComplaintList(){
  this._ApiService.GetOpenTicketsPendingList().subscribe((response) => {
})
}

GetNeedAssistanceList(){
  this._ApiService.GetNeedAssistanceList().subscribe((response) => {
})
}

ComplaintSummary(){
this._ApiService.ComplaintSummary().subscribe((response) => {
})
}

}
