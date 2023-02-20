
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api-service/api.service';

@Component({
  selector: 'app-amindash',
  templateUrl: './amindash.component.html',
  styleUrls: ['./amindash.component.css']
})
export class AmindashComponent implements OnInit {

  @ViewChild('stickyMenu') menuElement!: ElementRef;
  sticky: boolean = false;
  isAdmin!: boolean;
  elementPosition: any;


  public sidebarShow: boolean = false;
  active: boolean = false;
  statusLink: boolean = false;
  toggle:any





public list:any
  tab : any = 'tab1';
  tab1 : any
  tab2 : any
  tab3 : any
  tab4: any;
  tab5: any;
  tab6: any;
  tab7: any;
  tab8: any;
 public Clicked! : boolean;
 public step:any
 public GetProfileData : any = []
 allUserData:any=[]


 constructor(public _ApiService:ApiService,private router: Router) { }

  ngOnInit() {
    this.GetProfile()

    this.allUserData = [
      {
          Url_id: 2,
          url: "dashboard",
          url_name: "Dashboard",
          menu_name: "Dashboard",
          Status: true,
          Role_Id: 9,
          Plant_Id: 1,
          Id: 2
      },
    ];
  if(localStorage.getItem('roles') == 'ROLE_ADMIN' ){
    this.isAdmin = true;
    return
  }
  else
   this.isAdmin = false;
  {
  }
  }

  ngAfterViewInit(){
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }
  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    const windowScroll = window.pageYOffset;
    if(windowScroll >= this.elementPosition){
      this.sticky = true;
    } else {
      this.sticky = false;
    }
    if(windowScroll == 0){
      this.sticky = false;
    }
  }
  togglesideBar(){
    if(window.innerWidth<=667){
      var sidebarDiv= document.querySelector(".navigation") as HTMLElement;
      var maincontentDiv= document.querySelector(".main-content") as HTMLElement;

      if(sidebarDiv.style.display==''){
       sidebarDiv.style.display="none";
       maincontentDiv.style.display="block";
      }
      else if(maincontentDiv.style.display=="block"){
       maincontentDiv.style.display='none';
       sidebarDiv.style.display="block";
    }else if(sidebarDiv.style.display=="block"){

     sidebarDiv.style.display="none";
     maincontentDiv.style.display='block';
     }
    }
  }

  loggedin() {
    return localStorage.getItem('token');
  }

  onlogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('password');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
  }

  GetProfile(){
    this._ApiService.GetProfile().subscribe((response) => {
      this.GetProfileData = response;
    })
  }

  refresh(){
    this.GetProfile();
    this.GetComplaintList();
    this.ComplaintSummary();
    this.router.navigateByUrl('admin/dashboard');

  }
  GetComplaintList(){
    this._ApiService.GetComplaintList().subscribe((response) => {
  })
}

ComplaintSummary(){
  this._ApiService.GetComplaintList().subscribe((response) => {
  })
}

  onClick(check:any){
    //    console.log(check);
        if(check==1){
          this.tab = 'tab1';
        }else if(check==2){
          this.tab = 'tab2';
        }else if (check == 3) {
          this.tab = 'tab3';
        } else if (check == 4) {
          this.tab = 'tab4';
        } else if (check == 5) {
          this.tab = 'tab5';
        } else if (check == 6) {
          this.tab = 'tab6';
        } else if (check == 7) {
          this.tab = 'tab7';
        } else if (check == 8) {
          this.tab = 'tab8';
        }
      }



}


/////////////////////////////////////////////////////



  // toggleField() {

  //   if(this.toggle){
  //     this.active = false;
  //   }else{
  //     this.active = true;
  //   }
  //   }





    // this.active = !this.active;
    //this.statusLink = !this.statusLink;

  //   if (this.statusLink) {
  //     setTimeout(() => {
  //       this.statusLink = false;
  //     }, 230);
  //   } else {
  //     this.statusLink = true;
  //   }
  // }



      //   data (){
    //  let list:any
    //     for (var i = 0; i <list.length; i++) {

    //       list[i].onclick = function() {
    //         let j = 0;
    //         while(j < list.length) {
    //           list[j++].className = 'list';
    //         }
    //         list[i].className = 'list active';
    //       }

    //     }
    //   }

      // toggleField(check:any){
      //   if(check==1){
      //     this.toggle = 'toggle1';
      //   }else if(check==2){
      //     this.toggle = 'toggle2';
      //   }
      // }
