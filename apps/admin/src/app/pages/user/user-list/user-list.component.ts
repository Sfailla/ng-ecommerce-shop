import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { User, UserId } from '@nera/types'
import { ConfirmationDialogueService } from '@nera/ui'
import { UserService } from '@nera/users'

@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  // COMPONENT STATE
  title = 'Users'
  subtitle = 'List of all Users'

  users$: User[] = []

  constructor(
    private userService: UserService,
    private router: Router,
    private confirmationService: ConfirmationDialogueService
  ) {}

  ngOnInit(): void {
    this.getUsers()
  }

  navigateToEditPage(id: UserId) {
    this.router.navigate(['/categories/edit/', id])
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(response => {
      const users = response.users
      console.log({ users })

      this.users$ = users
    })
  }

  confirmation(id: UserId): void {}

  deleteCategory(id: UserId): void {
    this.confirmationService.handleConfirm(() => {
      alert()
    })
  }
}
