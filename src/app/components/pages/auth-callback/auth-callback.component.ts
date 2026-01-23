import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-auth-callback',
  template: `<p style="padding:16px">Validando sesión...</p>`,
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.auth.me().subscribe({
      next: () => this.router.navigate(['/main']),
      error: () => this.router.navigate(['/login']),
    });
  }
}
