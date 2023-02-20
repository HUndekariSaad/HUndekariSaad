import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  // LOGIN_POST_METHOD
  PostLoginDetails: string ='api/auth/login';

// Profile_Get
  loginProfile: string ='api/user/profile';

// Complaints_Summary
  complaintSummary: string ='api/complaints/complaint-summary';

  //GET_REPORTS_METHOD
  get_complaint_list: string ='api/complaints/list?all=true';
  // get_complaint_lists: string ='api/complaints/list?all=true&status=PENDING';
  get_complaint_pending_list: string ='api/complaints/list?all=true&status=PENDING';
  get_complaint_new_list: string ='api/complaints/list?all=true&status=NEW';
  // get_complaint_list_for_date: string ='api/complaints/list?all=true&status=DONE';
  get_complaint_list_for_date: string ='api/complaints/list?all=true';
  get_user_Kocode_list: string ='api/setting/all-users-by-role?role=coordinator';
  get_bank_mitra_Kocode_list: string ='api/bank-mitra/all-list';
  get_pending_list: string ='api/complaints/pending-list';
  get_need_assistance_list: string ='api/complaints/need-assistance-list';
  get_complaint_list_By_Id: string ='api/complaints/';
  post_complaint_excel: string ='api/complaints/import-from-excel';
  put_complaint_By_Id: string ='api/complaints/update/';
  // put_complaint_By_Id: string ='api/complaints/update/24/CLOSE/';


  // MESSAGE_FORM_POST_METHOD
  message_create:string ='api/notifications/send-message';
  get_all_sender_data='api/notifications/all-messages'


//Bank_Form_Add_Put_Get
  Add_bank:string ='api/banks'

  //Manage_Ko_Code_Form_Add_Put_Get
  ko_code_add:string ='api/bank-mitra/add-kocode'
  manage_ko_code_put:string ='api/bank-mitra/manage-kocode'
  manage_ko_code_get_by_id:string ='api/bank-mitra/getbykocode/'
  get_all_bank_list:string ='api/banks/list'



  // CHANGE_PASSWORD_FORM_PUT_METHOD
  change_password_update:string ='api/user/change-password';
  reset_password_add:string = 'api/setting/reset-password';

// SETTING_FORM_IN_ADD_PUT_GET_METHOD
  coordinator_add:string = 'api/setting/add-coordinator';
  member_add:string = 'api/setting/add-user';
  get_all_admin_coordinator_list:string = 'api/setting/all-admin-coordinator-list';


}
