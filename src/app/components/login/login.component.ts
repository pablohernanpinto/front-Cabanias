import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  correo: string = '';
  contrasena: string = '';
  errorMessage: string = '';


  constructor(
    private authService: AuthService, 
    private router: Router,
    private renderer: Renderer2,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.renderer.setStyle(this.document.body, 'background-color', '#253e85');
  }

  onLogin(): void {
    this.authService.login(this.correo, this.contrasena).subscribe({
      next: (response) => {
        this.authService.saveRol(response.rol)
        this.authService.saveToken(response.token);
        this.router.navigate(['/page']); // Redirige a la página de inicio o dashboard después de iniciar sesión
      },
      error: (err) => {
        this.errorMessage = 'Correo o contraseña incorrectos';
      }
    });
  }







}
