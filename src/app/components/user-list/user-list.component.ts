import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  isEmpty: boolean;

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
    this._userService.getUsers().subscribe(users => {
       this.users = users;
    });
  }

  editUser(user: User) {
    this.router.navigate(['/edit/' + user.id]);
  }

  deleteUser(user: User) {
    if(confirm('Delete User: ' + user.name + '?')) {
      this._userService.deleteUser(user);
    }
    
  }


}
