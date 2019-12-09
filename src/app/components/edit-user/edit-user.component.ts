import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id: string;
  user: User = {
    id: '',
    name: '',
    email: ''
  }


  constructor(private _userService: UserService, private _router: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
    //get id from url
    this.id = this._router.snapshot.params['id'];

    //get user
    this._userService.getUser(this.id).subscribe(user => {
      this.user = user;
    });


  }

  onSubmit({value, valid} : {value: User, valid: boolean}) {
    this._userService.updateUser(value);
    this._route.navigate(['/users']);

  }


}
