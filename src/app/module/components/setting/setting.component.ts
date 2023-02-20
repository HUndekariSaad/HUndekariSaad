import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api-service/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

type AOA = any[][];
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  public CoordinatorForm!: FormGroup;
  public MemeberForm!: FormGroup;
  public ImportExcelForm!: FormGroup;
  public BankForm!: FormGroup;
  public submitted:boolean = false;
  public isSubmitted:boolean = false;
  public fSubmitted:boolean = false;
  public Submitted:boolean = false;
 public isAddMode!: boolean
  public id!: number;
  selectedItems:any = [];
  // dropdownSettings = {};
  dropdownSettings:any = [];
  dropdownList:any = [ ];
  // cities:any = [];
  selectedCityIds!: string[];
  public   fileInputLabel!: string;
  rolList: any = ['admin', 'member',];
  role: any = [];
  Name: any;
  ExcelData: any;
  file: any;
  coordinator:any;
  cities:any = [
    { Name: 'Coordinator', name: 'coordinator' },
    { Name: 'RM', name: 'rm' },
  ];
  storeData: any;
  worksheet: any;
  fileUploaded!: File;
  isAdd: boolean = true;
  workBook!:any

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  constructor(public _ApiService:ApiService,private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.CoordinatorForm = new FormGroup ({
        name:new FormControl('',[Validators.required]),
        username:new FormControl('',[Validators.required]),
         password:new FormControl('',[Validators.required]),
        mobileNumber:new FormControl('',[Validators.required]),
        roles:new FormControl('',[Validators.required]),
        rmId:new FormControl(''),
    })
    this.MemeberForm = new FormGroup ({
      name:new FormControl('',[Validators.required]),
      username:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      designation:new FormControl('test'),
      mobileNumber:new FormControl('',[Validators.required]),
      role:new FormControl('',[Validators.required]),
    })
    this.ImportExcelForm = new FormGroup ({
      file :new FormControl('',[Validators.required]),
    })

    this.BankForm = new FormGroup ({
      name :new FormControl('',[Validators.required]),
    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    // this.getData();
    // this.selectAllForDropdownItems(this.getData());
  }



// Validation_Coordinator_Form
  get f() {
    return this.CoordinatorForm.controls;
  }
// Validation_Member_Form
  get v() {
    return this.MemeberForm.controls;
  }
  get F() {
    return this.BankForm.controls;
  }
  get s() {
    return this.ImportExcelForm.controls;
  }

  Delete(){
    this.CoordinatorForm.reset();
    this.CoordinatorForm.controls['username'].setErrors(null);
    this.CoordinatorForm.controls['password'].setErrors(null);
    this.CoordinatorForm.controls['name'].setErrors(null);
    this.CoordinatorForm.controls['roles'].setErrors(null);
    this.CoordinatorForm.controls['mobileNumber'].setErrors(null);
  }
  formDelete(){
    this.MemeberForm.reset();
    this.CoordinatorForm.controls['username'].setErrors(null);
    this.CoordinatorForm.controls['password'].setErrors(null);
    this.CoordinatorForm.controls['name'].setErrors(null);
    this.CoordinatorForm.controls['roles'].setErrors(null);
    this.CoordinatorForm.controls['mobileNumber'].setErrors(null);
  }
  resetImport(){
    this.ImportExcelForm.reset();
    this.CoordinatorForm.controls['file'].setErrors(null);
  }


// Submit_Coordinator_Form
  OnSubmitCoordinatorForm(){
    this.submitted = true;
    if(this.CoordinatorForm.invalid){
      return
    }
    console.log('CoordinatorForm',this.CoordinatorForm.value)
    this.CoordinatorAdd()
  }
 CoordinatorAdd(){
    this._ApiService.CoordinatorAdd(this.CoordinatorForm.value).subscribe((response)=>{
      this.router.navigateByUrl('admin/setting');
      Swal.fire("Success!", "Add Coordinator successfully!","success");
      this.CoordinatorForm.reset();
      this.CoordinatorForm.controls['username'].setErrors(null);
      this.CoordinatorForm.controls['password'].setErrors(null);
      this.CoordinatorForm.controls['name'].setErrors(null);
      this.CoordinatorForm.controls['roles'].setErrors(null);
      this.CoordinatorForm.controls['mobileNumber'].setErrors(null);
    })
  }

 // Submit_Member_Form
  OnSubmitMemberForm(){
    this.isSubmitted = true;
    if(this.MemeberForm.invalid){return
    }
    this.MemberAdd()
  }
  MemberAdd(){
    this._ApiService.MemberAdd(this.MemeberForm.value).subscribe((response)=>{
      this.router.navigateByUrl('admin/setting');
      Swal.fire("Success!", "Add Member successfully!","success")
      this.MemeberForm.reset();
      this.MemeberForm.controls['username'].setErrors(null);
      this.MemeberForm.controls['password'].setErrors(null);
      this.MemeberForm.controls['name'].setErrors(null);
      this.MemeberForm.controls['role'].setErrors(null);
      this.MemeberForm.controls['mobileNumber'].setErrors(null);
      this.MemeberForm.controls['designation'].setErrors(null);
    })
  }

   // Submit_Bank_Form
  OnBankSubmit(){
    this.fSubmitted = true;
    if(this.BankForm.invalid){return
    }
this.BankCreate()
  }
  BankCreate(){
    this._ApiService.BankCreate(this.BankForm.value).subscribe((response)=>{
      this.router.navigateByUrl('admin/setting');
      Swal.fire("Success!", "Bank Added successfully!","success");
      this.BankForm.reset();
      this.BankForm.controls['name'].setErrors(null);
    })
  }
  resetBank(){
    this.BankForm.reset();
    this.BankForm.controls['name'].setErrors(null);
  }

 // Submit_Excel_Form
  OnSubmit(){
    this.Submitted = true;
    if(this.ImportExcelForm.invalid){return
    }
    console.log('ImportExcelForm',this.ImportExcelForm.value)
    this.ImportExcel()
  }
  name:any
  ImportExcel(){
    // this.file =this.ExcelData
    // const formdata =new FormData();
    // formdata.append("file",this.ExcelData);

    //  this.name = this.parseFileName(this.file.attachment.name);
    // formdata.append('attachment', this.file.attachment.file,this.name);

    this._ApiService.ImportExcel(this.ExcelData).subscribe((response)=>{
      this.router.navigateByUrl('admin/setting');
      Swal.fire("Success!", "Import Excel successfully!","success");
      this.ImportExcelForm.reset();
      this.CoordinatorForm.controls['file'].setErrors(null);
    })
  }


    onFileChange(ev:any) {
      var file = ev.target.files[0];
      var fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = (e:any) => {
        var workBook =XLSX.read(fileReader.result,{type:'binary'});
        var sheetNames = workBook.SheetNames;

       this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
console.log('ExcelData',this.ExcelData);
      }

    }
  // onFileChange(evt: any){
  //   this.file = evt.target.files[0];
  //   console.log(this.file)
  // }
  // onFileChange(evt: any){
  //   this.file = "file.xlsx";
  //   header('Content-disposition: attachment; filename='.$file);
  //   header('Content-Length: ' . filesize($file));
  //   header('Content-Transfer-Encoding: binary');
  //   header('Cache-Control: must-revalidate');
  //   header('Pragma: public');
  //   echo json_encode(readfile($file));
  // }


  changeCity(e: any) {
    this.Name?.setValue(e.target.value, {
      onlySelf: true,
    });
  }


  onMaterialGroupChange(event:any) {
    console.log(event);
  }



}


function json_encode(arg0: any) {
  throw new Error('Function not implemented.');
}

function readfile($file: any): any {
  throw new Error('Function not implemented.');
}

  // getData() {
  //    (this.cities = [
  //     { Name: 'Coordinator', name: 'coordinator' },
  //     { Name: 'RM', name: 'rm' },
  //   ]);
  // }
