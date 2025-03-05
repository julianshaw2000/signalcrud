import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
// import { AuthService } from "../services/auth.service";
// import { MessagesService } from "../messages/messages.service";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MessagesService } from '../_services/messages.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'login',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  fb = inject(FormBuilder);

  form = this.fb.group({
    email: [''],
    password: ['']
  });

  messagesService = inject(MessagesService);

  authService = inject(AuthService);

  router = inject(Router);

  async onLogin() {
    try {
      const { email, password } = this.form.value;

      console.log('onLogin', this.form.value);

      if (!email || !password) {
        this.messagesService.showMessage(
          "Enter an email and password.",
          "error"
        )
        return;
      }
      console.log('email test', email, 'password', password);
      await this.authService.login(email, password);
      await this.router.navigate(['/home']);
    }
    catch (err) {
      console.error(err);
      this.messagesService.showMessage(
        "Login failed, please try again",
        "error"
      )
    }
  }
}
