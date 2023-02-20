import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { ApiService } from 'src/app/api-service/api.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public MessageForm!: FormGroup;
  public submitted: boolean = false;
  public isAddMode!: boolean
  public id!: number;
  public requiredField: boolean = false;
  public res: any;
  public selectedItems: any = [];
  public dropdownSettings: any = [];
  public dropdownList: any = [];
  public visible:boolean = true
  public visible2:boolean = false

  public cities: any = [];
  public users: any = [];

  public getKoCodeList: any = [];
  public getKoCode: any = [];
  public selectedCityIds!: string[];
  public City:any =['admin', 'member'];
  public getSenderData: any = [];

  public Coordinator: any;
  public recepient: any = [];

  constructor(public _ApiService: ApiService, private router: Router,) { }

  ngOnInit() {
    this.GetSenderList()
    this.GetProfile()
    this.GetBankMitraKocodeList()
    this.MessageForm = new FormGroup({
      body: new FormControl('', [Validators.required]),
      recipients: new FormControl('', [Validators.required]),
      sender: new FormControl('', [Validators.required]),
      topic: new FormControl('general'),
      broadcast: new FormControl(true),
      title: new FormControl('New Message'),
    })
    this.getData()
    // this.selectAllForDropdownItems(this.getData());
    combineLatest({
      users: this._ApiService.GetBankMitraKocodeList(),
      contacts: this._ApiService.GetUserKocodeList(),
      addresses: this._ApiService.GetUserKocodeList(),
    })
    .pipe(
      map(response => {
        // debugger
        const users = <Array<any>>response.users;
        const contacts = <Array<any>>response.contacts;
        const addresses = <Array<any>>response.addresses;
        const result: any[] = [];
        users.map((user: any) => {
          result.push({
            ...user,
            ...contacts.find((contact: any) => contact.userId === user.userId),
            ...addresses.find((address: any) => address.userId === address.userId)})
        });

        // console.log("result ", result)
        return result;
      })
    )
    .subscribe((data) => {
      // console.log('============',data)
      this.users = data;
      this.selectAllForDropdownItems(data)
    });



  }


  get f() {
    return this.MessageForm.controls;
  }

  OnSubmit() {
    this.submitted = true;
    if (this.MessageForm.invalid) {
      return
    }
    this.MessageFormCreate()
  }

  MessageFormCreate() {
    this._ApiService.MessageCreate(this.MessageForm.value).subscribe((res) => {
      this.router.navigateByUrl('admin/message');
      Swal.fire("Success!", "Messege Send  successfully!", "success");
      this.MessageForm.controls.body.reset();
      this.MessageForm.controls.sender.reset();
      this.MessageForm.controls.recipients.reset();
      this.MessageForm.controls['body'].setErrors(null);
      this.MessageForm.controls['sender'].setErrors(null);
      this.MessageForm.controls['recipients'].setErrors(null);
      this.submitted = false;
    })
  }

  Delete() {
    // this.MessageForm.reset();
    this.MessageForm.controls.body.reset();
    this.MessageForm.controls.sender.reset();
    this.MessageForm.controls.recipients.reset();
    this.MessageForm.controls['body'].setErrors(null);
    this.MessageForm.controls['recipients'].setErrors(null);
    this.MessageForm.controls['sender'].setErrors(null);
    this.submitted = false;
  }

  GetSenderList() {
    this._ApiService.GetSenderList().subscribe((res) => {
      this.dropdownSettings = res
    })

  }

  GetComplaintList() {
    this._ApiService.GetComplaintList().subscribe((response) => {
      this.getKoCodeList = response.complaints;
      this.cities = response.complaints;
    })
  }
  GetBankMitraKocodeList() {
     this._ApiService.GetUserKocodeList().subscribe((response) => {
      // console.log('GetUserKocodeList',response)
     this.getKoCode = response;
     this.selectAllForDropdownItems(response)
    })
  }

  GetProfile() {
    this._ApiService.GetProfile().subscribe((response) => {
      this.getSenderData = response;
    })
  }



  setStatus() {
    this.selectedItems.length > 0
      ? (this.requiredField = true)
      : (this.requiredField = false);
  }

  setClass() {
    this.setStatus();
    if (this.selectedItems.length > 0) {
      return 'validField';
    } else {
      return 'invalidField';
    }
  }

  submission() {
    if (this.requiredField == false) {
    }
  }


  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  onSelectAll(item: any) {
    console.log('onSelectAll', item);
  }



  onMaterialGroupChange(event:any) {
    console.log(event);
  }

  getData() {
    // debugger;
    this.getKoCodeList;
    return (
      this._ApiService.GetBankMitraKocodeList().subscribe((response) => {
        this.getKoCodeList = response;
        this.cities = response;
        // console.log('GetBankMitraKocodeList',response)
        this.selectAllForDropdownItems(response)
      })

    )

  }

  selectAllForDropdownItems(items: any[]) {
    let allSelect = (items:any) => {
      items.forEach((element:any) => {
        element['all'] = 'all';
      });
    };

    allSelect(items);
  }


  onclick()
  {
    this.visible = !this.visible; //not equal to condition
    this.visible2 = !this.visible2
  }

}


///////////////////////////////////////////////////////


// this.dropdownList = [
//   { item_id: 1, item_text: 'India' },
//   { item_id: 2, item_text: 'Singapore' },
//   { item_id: 3, item_text: 'Australia' },
//   { item_id: 4, item_text: 'Canada' },
//   { item_id: 5, item_text: 'Pakistan' },
//   { item_id: 6, item_text: 'Japan' },
// ];

// this.selectedItems = [
//   { item_id: 2, item_text: 'Singapore' },
//   { item_id: 3, item_text: 'Australia' },
// ];
