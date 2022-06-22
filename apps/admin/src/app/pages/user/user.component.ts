import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'admin-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users$: User[] = []
  title = 'Categories'
  subtitle = 'List of all categories'

  constructor() {}

  ngOnInit(): void {}
}
