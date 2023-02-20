
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { interval } from 'rxjs';
import { ApiService } from 'src/app/api-service/api.service';
import { ExcelService } from 'src/app/api-service/Excel.service';
import { ReportParams } from 'src/app/modules/_modules/reportParams';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {

  public getcomplaintlist : any = []
  public ReportForm!: FormGroup;
  public submitted:boolean = false;
  public table:any
  myDateValue!: Date;
  public dateValue!: boolean;
  date: any;
  // date.split("/").reverse().join("-")


  constructor(public _ApiService:ApiService,private excel: ExcelService) {}

  ngOnInit() {
    this.GetComplaintList();
    const obs$ = interval(50000);
    obs$.subscribe((d)=>{
      console.log(d);
      this.GetComplaintList();
    })

    this.ReportForm = new FormGroup ({
      startDate:new FormControl('',[Validators.required]),
      endDate:new FormControl('',[Validators.required]),
    })
  }

  get f() {
    return this.ReportForm.controls;
  }

p:any;
  GetComplaintList(){
    this._ApiService.GetComplaintList().subscribe((response) => {
        this.getcomplaintlist = response.complaints;
  })
}

Clear(){
  this.ReportForm.reset();
  this.ReportForm.controls['startDate'].setErrors(null);
  this.ReportForm.controls['endDate'].setErrors(null);
  this.GetComplaintList();

}


 // Submit_Excel_Form
 OnSubmit(){
  this.submitted = false;
 if(this.ReportForm.value.startDate > this.ReportForm.value.endDate ){
alert("Please select End date greater than or equal to Start Date.");
this.dateValue = true;
return
 }
 else
 this.dateValue = false;
 {
  this.submitted = true;
  this.GetComplaintListDate()
 }
}
GetComplaintListDate(){
  var date11 = this.ReportForm.controls.startDate.value
var startDate = date11.split("-").reverse().join("-")
var date22 = this.ReportForm.controls.endDate.value
var endDate = date22.split("-").reverse().join("-")
    this._ApiService.GetComplaintListDate(startDate,endDate).subscribe((response) => {
      this.getcomplaintlist = response.complaints;
  })
}

PostComplaintExcel(): void {
  this.excel.exportExcel('ExampleTable');
}

}


