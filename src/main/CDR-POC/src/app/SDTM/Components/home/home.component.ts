import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName = '';
  isSdtmUser=false;
  isAdminUser=false;
  constructor(private userService: UserService) { }
  ngOnInit() {
    const userDetails = this.userService.getUser();
    if (userDetails !== undefined) {
    const userDetail = userDetails.firstName + ' ' + userDetails.lastName;
    if (userDetail != null) {
      this.userName = userDetail.trim();
    }
    } else {
      this.userName = 'Admin';
    }
    if (this.userName=='sdtm sdtm')
    {
      this.isSdtmUser=true;
    }
    if (this.userName=='Admin')
    {
      this.isAdminUser=true;
    }
  }
}
