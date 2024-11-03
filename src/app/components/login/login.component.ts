import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
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

  login() {
    if (this.form.valid) {
      const loginData = this.form.value;
      this.http.post('https://localhost:7230/api/Usuario/Login', loginData).subscribe(
        (data) => {
          // Redirigir a la página principal después de un inicio de sesión exitoso
          this.router.navigateByUrl('/page');
        },
        (error) => {
          alert('Usuario invalido');
          console.error(error);
        }
      );
    } else {
      alert('Formulario no válido');
    }
  }

  loginVisita() {
    // Lógica para login de visita
  }
}
