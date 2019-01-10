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
  isDqUser=false;
  constructor(private userService: UserService) { }
  ngOnInit() {
    const userDetails = this.userService.getUser();
    if (userDetails !== undefined) {
    const userDetail = userDetails.firstName;
    if (userDetail != null) {
      this.userName = userDetail.trim();
    }
    } else {
      this.userName = 'Admin';
    }
    if (this.userName === 'Admin') {
      this.isAdminUser = true;
    } else if (this.userName === 'Mary') {
      this.isSdtmUser = true;
    } else if (this.userName === 'Harry') {
      this.isDqUser = true;
    }
  }
}
