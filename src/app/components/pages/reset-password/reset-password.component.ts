import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
 password: string = '';
 password2: string = '';
 token: string = '';


  constructor(private userService: UsuarioService, private route: ActivatedRoute, private router:Router) {}


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('t')!.split('=')[1]; // Obtiene el parámetro "t"
      console.log('token: ', this.token);
    });
  }


  resetPassword(){
    if(this.password == this.password2){
      //Llamar al servicio de reset password
      this.userService.resetPassword(this.token,this.password).subscribe({
        next: (res) => {
          console.log(res);
          alert('Contraseña cambiada correctamente');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al cambiar contraseña:', error);
          alert('Error al cambiar contraseña');
        }
      });
      
    }else{
      alert('Las contraseñas no coinciden');
    }
  }


}
