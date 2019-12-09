import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @ViewChild('userForm', {static: false}) form: any;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  onSubmit({value, valid} : {value: User, valid: boolean}) {
    this._userService.createNewUser(value);
    this._router.navigate(['/users']);

  }


}
