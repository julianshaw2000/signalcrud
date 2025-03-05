import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';


const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #userSignal = signal<User | null>(null);

  user = this.#userSignal.asReadonly();

  isLoggedIn = computed(() => !!this.user());

  router = inject(Router);

  http = inject(HttpClient)
  env = environment;


  constructor() {
    effect(() => {
      this.loadUserFromStorage();

      const user = this.user();
      if (user) {
        console.log('User is logged in', user);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }
    })
  }

  loadUserFromStorage() {
    const user = localStorage.getItem(USER_STORAGE_KEY);
    if (user) {
      this.#userSignal.set(JSON.parse(user));
    }
  }

  async logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.#userSignal.set(null);
    await this.router.navigate(['/login']);
  }

  async login(email: string, password: string): Promise<User> {

    const payload = {
      email, password
    };
    const login$ = await this.http.post<User>(`${this.env.apiRoot}/login`, payload);

    const user = await firstValueFrom(login$);

    this.#userSignal.set(user);

    return user;
  }

}

