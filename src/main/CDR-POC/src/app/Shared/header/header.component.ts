import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/SDTM/Services';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() appName: string;

  userName = '';
  public location = '';
  constructor(private userService: UserService, private _router: Router) {
    this.location = _router.url;
  }

  ngOnInit() {
    const userDetails = this.userService.getUser();
    if (userDetails !== undefined) {
      //const userDetail = userDetails.firstName + ' ' + userDetails.lastName;
      const userDetail = userDetails.firstName;
      this.userName = userDetail;
    } else {
      this.userName = 'Admin';
    }
  }

}
