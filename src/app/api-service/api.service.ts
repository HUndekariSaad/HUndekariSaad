import { Injectable } from '@angular/core';
import { UrlsService } from './urls.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Login } from '../modules/login';
import { Pagination } from '../modules/_modules/pagination';
import { catchError, map, Subject, tap } from 'rxjs';



var token = localStorage.getItem('token');
var headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Authorization', 'Bearer ' + token);
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  forkJoin(arg0: any[]) {
    throw new Error('Method not implemented.');
  }

  baseUrl = environment.baseUrl;
  baseUrls = environment.baseUrls;
  pagination!: Pagination

  constructor(private http: HttpClient, public urls: UrlsService) { }
  private _refreshNeeded$ = new Subject<void>();
  // LOGIN_METHOD
  PostLoginDetails(data: Login): Observable<any> {
    return this.http.post(this.baseUrls + this.urls.PostLoginDetails, data).pipe(map(
      response => {
        return response;
      }))
      .pipe(catchError(err => {
        // i cannot get anything here
        console.log(err);
        return err;
      }));

  }

  get refreshNeeded(){
    return this._refreshNeeded$
  }
  //GET_Profile_METHOD
  GetProfile(): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl + this.urls.loginProfile, { 'headers': headers });
  }

  //GET_Profile_METHOD
  ComplaintSummary(): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl + this.urls.complaintSummary, { 'headers': headers });
  }


  //GET_REPORTS_METHOD
  GetComplaintList(): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl + this.urls.get_complaint_list, { 'headers': headers });
  }

  //GET_REPORTS_METHOD
  GetOpenTicketsPendingList(): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl + this.urls.get_complaint_pending_list, { 'headers': headers });

  }
  GetOpenTicketsNewList(): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl + this.urls.get_complaint_new_list, { 'headers': headers });
  };
  GetUserKocodeList(): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl + this.urls.get_user_Kocode_list, { 'headers': headers });
  }
  GetBankMitraKocodeList(): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl + this.urls.get_bank_mitra_Kocode_list, { 'headers': headers });
  }




  ImportExcel(data: any): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(this.baseUrl + this.urls.post_complaint_excel, data, { 'headers': headers });
  }
  ImportExcelFile(formData: any): Observable<any> {
    // var token = localStorage.getItem('token');
    // var headers = new HttpHeaders()
    //   .set('content-type', 'application/json')
    //   .set('Access-Control-Allow-Origin', '*')
    //   .set('Authorization', 'Bearer ' + token);
    return this.http.post(this.baseUrl + this.urls.post_complaint_excel,formData, { reportProgress: true, observe: 'events', responseType: 'json' });
  }




  GetComplaintListDate(startDate: any, endDate: any): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    // return this.http.get(this.baseUrl + this.urls.get_complaint_list_for_date+'&startDate='+'01-01-2023'+'&endDate='+'05-01-2023',{ 'headers': headers });
    return this.http.get(this.baseUrl + this.urls.get_complaint_list_for_date + '&startDate=' + startDate + '&endDate=' + endDate, { 'headers': headers });
  }
  GetNeedAssistanceList(): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    // return this.http.get(this.baseUrl + this.urls.get_complaint_list_for_date+'&startDate='+'01-01-2023'+'&endDate='+'05-01-2023',{ 'headers': headers });
    return this.http.get(this.baseUrl + this.urls.get_need_assistance_list, { 'headers': headers });
  }
  GetPendingList(): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl + this.urls.get_pending_list, { 'headers': headers });
  }
  GetComplaintListById(id: any): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl + this.urls.get_complaint_list_By_Id + id, { 'headers': headers });
  }

  PutComplaintById(id: number): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.put(this.baseUrl + this.urls.put_complaint_By_Id + id + '/' + 'CLOSE', {}, { 'headers': headers });
    // return this.http.put(`api/complaints/update/${id}/CLOSE`,{ 'headers': headers });
    // return this.http.put(this.baseUrl + this.urls.put_complaint_By_Id,{ 'headers': headers });
  }

  // MESSAGE_POST_METHOD
  MessageCreate(data: any): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(this.baseUrl + this.urls.message_create, data, { 'headers': headers });
  }

  BankCreate(data: any): Observable<any> {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(this.baseUrl + this.urls.Add_bank, data, { 'headers': headers });
  }

  GetSenderList() {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl + this.urls.get_all_sender_data, { 'headers': headers });
  }

  // CHANGE_PASSWORD_PUT_METHOD
  ResetPassword(data: any) {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(this.baseUrl + this.urls.reset_password_add, data, { 'headers': headers });
  }
  ChangePasswordUpdate(data: any) {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(this.baseUrl + this.urls.change_password_update, data, { 'headers': headers });
  }

  // SETTING_FORM_IN_ADD_PUT_GET_METHOD
  CoordinatorAdd(data: any) {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(this.baseUrl + this.urls.coordinator_add, data, { 'headers': headers }).pipe(
tap(() =>{
this._refreshNeeded$
    })
    )
  }
  MemberAdd(data: any) {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(this.baseUrl + this.urls.member_add, data, { 'headers': headers });
  }


  //Manage_Code_Add_Put_Get
  KoCodeAdd(data: any) {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(this.baseUrl + this.urls.ko_code_add, data, { 'headers': headers });
  }
  ManageCodeUpdate(data: any) {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.put(this.baseUrl + this.urls.manage_ko_code_put, data, { 'headers': headers });
  }
  ManageCodeGetById(id: any) {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl + this.urls.manage_ko_code_get_by_id + id, { 'headers': headers });
  }
  GetAllBankList() {
    var token = localStorage.getItem('token');
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl + this.urls.get_all_bank_list, { 'headers': headers });
  }









}
