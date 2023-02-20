import { Component, OnInit } from '@angular/core';
import { combineLatest, interval } from 'rxjs';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { combineLatestWith, map } from 'rxjs/operators';
import { ApiService } from 'src/app/api-service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public getComplaintPendingList: any = []
  public getPendingList: any = []
  public getComplaintNewList: any = []
  public getComplaintSummary: any = []
  public getNeedAssistanceList: any = []
  public complaintId: any;
  ticketData: any = [];
  users: any[] = [];
  sub: any;
  //  public books:any
  //  public authors:any

  constructor(public _ApiService: ApiService) {

    //     Observable.interval(1000)
    //     .subscribe((val:any) => { console.log('called');
    //     this.GetComplaintPendingList();
    //     this.GetComplaintNewList();
    //     this.ComplaintSummary();
    //     this.GetNeedAssistanceList();
    // });
   }

  ngOnInit() {
    const obs$ = interval(10000);
    obs$.subscribe((d)=>{
      console.log(d);
      this.GetComplaintNewList();
      this.ComplaintSummary();
      this.GetNeedAssistanceList();
      this.GetComplaintPendingList();
    })

  }

  ngAfterViewInit() {
    this.GetComplaintNewList();
    this.ComplaintSummary();
    this.GetNeedAssistanceList();
    this.GetComplaintPendingList();

    // combineLatest({
    //   users: this._ApiService.GetOpenTicketsNewList(),
    //   contacts: this._ApiService.GetOpenTicketsPendingList(),
    //   addresses: this._ApiService.GetOpenTicketsPendingList()
    // })
    // .pipe(
    //   map(response => {
    //     // if(response!=null){
    //       var users = <Array<any>>response.users.complaints;
    //       var contacts = <Array<any>>response.contacts.complaints;
    //       var addresses = <Array<any>>response.addresses.complaints;
    //       var result: any[] = [];
    //       addresses.filter((user: any) => {
    //         result.push({
    //           ...user,
    //           ...contacts.find((contact: any) => contact.userId === user.userId),
    //           ...addresses.find((address: any) => address.userId === address.userId)})
    //       });
    //       console.log("result ", result)
    //       return result;
    //   })
    // )
    // .subscribe((data) => {
    //   this.users = data;
    // });
  }



  GetComplaintPendingList() {
    this._ApiService.GetOpenTicketsPendingList().subscribe((response) => {
      this.getComplaintPendingList = response.complaints;
    })
  }

  p: any;



  GetComplaintNewList() {
    this._ApiService.GetOpenTicketsNewList().subscribe((response) => {
      this.getComplaintNewList = response.complaints;
    })
  }

  GetNeedAssistanceList() {
    this._ApiService.GetNeedAssistanceList().subscribe((response) => {
      this.getNeedAssistanceList = response;
      // this.GetNeedAssistanceList();
    })
  }


  ComplaintSummary() {
    this._ApiService.ComplaintSummary().subscribe((response) => {
      this.getComplaintSummary = response;
    })
  }


  GetComplaintListById(id: any) {
    this._ApiService.GetComplaintListById(id).subscribe((Response) => {
      this.getPendingList = Response

    })
  }
  closeComplaintList(id: number) {
    this._ApiService.PutComplaintById(id).subscribe((Response) => {
      this.GetNeedAssistanceList();
      this.GetComplaintNewList();
      this.GetComplaintPendingList();
      this.GetComplaintList();
      Swal.fire("Success!", " Close Complaint successfully!", "success");
    })

  }


  GetComplaintList(){
    this._ApiService.GetComplaintList().subscribe((response) => {

  })
}

}
