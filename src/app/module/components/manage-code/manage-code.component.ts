import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api-service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-code',
  templateUrl: './manage-code.component.html',
  styleUrls: ['./manage-code.component.css']
})
export class ManageCodeComponent implements OnInit {

  public UpdateKoCodeForm!: FormGroup;
  public KoCodeForm!: FormGroup;
  public submitted:boolean = false;
  public isSubmitted:boolean = false;
 public isAddMode!: boolean
  public id!: number;
  public getAllBankList:any = []
  public City: any = ['BOB', 'BOI', 'SBI', 'CBI'];

  public  cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

   // public exampleData!: Array<Select2OptionData>;
  bankName: any;
  constructor(public _ApiService:ApiService,private router: Router,) { }

  ngOnInit() {
this.GetAllBankList()
this.UpdateKoCodeForm = new FormGroup ({
  bankName:new FormControl('',[Validators.required]),
  koCode:new FormControl('',[Validators.required]),
  name:new FormControl('',[Validators.required]),
  mobileNumber:new FormControl('',[Validators.required]),
  coOrdinatorId:new FormControl('',[Validators.required]),
})

this.KoCodeForm = new FormGroup ({
  bankName:new FormControl('',[Validators.required]),
  koCode:new FormControl('',[Validators.required]),
  village:new FormControl('',[Validators.required]),
  name:new FormControl('',[Validators.required]),
  mobileNumber:new FormControl('',[Validators.required]),
  state:new FormControl('',[Validators.required]),
  district:new FormControl('',[Validators.required]),
  region:new FormControl('',[Validators.required]),
  coOrdinatorId:new FormControl('',[Validators.required]),
  branchName:new FormControl('',[Validators.required]),
})
  }

  get f() {
    return this.UpdateKoCodeForm.controls;
  }
  get V() {
    return this.KoCodeForm.controls;
  }




  OnSubmit(){
    this.submitted = true;
    if(this.UpdateKoCodeForm.invalid){
      return
    }
    this.ManageCodeUpdate()
    // this.submitted = false;
  }

  ManageCodeUpdate(){
    this._ApiService.ManageCodeUpdate(this.UpdateKoCodeForm.value).subscribe((response)=>{
      this.router.navigateByUrl('admin/managecode');
      Swal.fire("Success!", " Update ManageCode successfully!","success");
      this.UpdateKoCodeForm.reset();
      this.UpdateKoCodeForm.controls['bankName'].setErrors(null);
      this.UpdateKoCodeForm.controls['koCode'].setErrors(null);
      this.UpdateKoCodeForm.controls['mobileNumber'].setErrors(null);
      this.UpdateKoCodeForm.controls['name'].setErrors(null);
      this.UpdateKoCodeForm.controls['coOrdinatorId'].setErrors(null);
    })
  }


  OnSubmits(){
    this.isSubmitted = true;
    if(this.KoCodeForm.invalid){
      return
    }
    // console.log('KoCodeForm',this.KoCodeForm.value);
    this.KoCodeAdd()
    // this.submitted = false;
  }
  KoCodeAdd(){
    this._ApiService.KoCodeAdd(this.KoCodeForm.value).subscribe((response)=>{
      this.router.navigateByUrl('admin/managecode');
      Swal.fire("Success!", "Add KoCode successfully!","success");
      this.KoCodeForm.reset();
      this.KoCodeForm.controls['koCode'].setErrors(null);
      this.KoCodeForm.controls['bankName'].setErrors(null);
      this.KoCodeForm.controls['village'].setErrors(null);
      this.KoCodeForm.controls['mobileNumber'].setErrors(null);
      this.KoCodeForm.controls['name'].setErrors(null);
      this.KoCodeForm.controls['coOrdinatorId'].setErrors(null);
      this.KoCodeForm.controls['state'].setErrors(null);
      this.KoCodeForm.controls['district'].setErrors(null);
      this.KoCodeForm.controls['region'].setErrors(null);
      this.KoCodeForm.controls['branchName'].setErrors(null);
    })
  }




  Delete(){
    this.UpdateKoCodeForm.reset();
    this.UpdateKoCodeForm.controls['bankName'].setErrors(null);
    this.UpdateKoCodeForm.controls['koCode'].setErrors(null);
    this.UpdateKoCodeForm.controls['mobileNumber'].setErrors(null);
    this.UpdateKoCodeForm.controls['name'].setErrors(null);
    this.UpdateKoCodeForm.controls['coOrdinatorId'].setErrors(null);
  }
  formDelete(){
    this.KoCodeForm.reset();
    this.KoCodeForm.controls['koCode'].setErrors(null);
      this.KoCodeForm.controls['bankName'].setErrors(null);
      this.KoCodeForm.controls['village'].setErrors(null);
      this.KoCodeForm.controls['mobileNumber'].setErrors(null);
      this.KoCodeForm.controls['name'].setErrors(null);
      this.KoCodeForm.controls['coOrdinatorId'].setErrors(null);
      this.KoCodeForm.controls['state'].setErrors(null);
      this.KoCodeForm.controls['district'].setErrors(null);
      this.KoCodeForm.controls['region'].setErrors(null);
      this.KoCodeForm.controls['branchName'].setErrors(null);

  }
  changeCity(e: any) {
    this.bankName?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  // MemberAdd(){
  //   this._ApiService.MemberAdd(this.CoordinatorForm.value).subscribe((response)=>{
  //   })
  ManageCodeGetById(){
    this._ApiService.ManageCodeGetById(this.UpdateKoCodeForm.value.koCode).subscribe((response:any)=>{
      this.UpdateKoCodeForm.get('bankName')?.patchValue(
        response.bankName);
      this.UpdateKoCodeForm.get('name')?.patchValue(
        response.name);
      this.UpdateKoCodeForm.get('mobileNumber')?.patchValue(
        response.mobileNumber);
      this.UpdateKoCodeForm.get('coOrdinatorId')?.patchValue(
        response.coOrdinator);

    })

  }
  KoCodeGetById(){
    this._ApiService.ManageCodeGetById(this.KoCodeForm.value.koCode).subscribe((response:any)=>{
      this.KoCodeForm.get('bankName')?.patchValue(
        response.bankName);
    })

  }

  GetAllBankList(){
    this._ApiService.GetAllBankList().subscribe((response:any)=>{
      this.getAllBankList =response
    })
  }

}
