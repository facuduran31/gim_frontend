import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

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
    if(this.password == this.password2 && this.password.trimEnd() != '' && this.password2.trimEnd() != ''){
      //Llamar al servicio de reset password
      this.userService.resetPassword(this.token,this.password).subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire({
            title: "Confirmado",
            text: "Contraseña cambiada correctamente",
            icon: "success"
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al cambiar contraseña:', error);
          Swal.fire({
            title: "Error al cambiar contraseña",
            text: "Intenta de nuevo màs tarde",
            icon: "error"
          });
        }
      });
      
    }else if(this.password.trimEnd() == '' || this.password2.trimEnd() == '') {
      Swal.fire({
        title: "Error al cambiar contraseña",
        text: "La contraseña no puede estar vacía",
        icon: "error"
      });
    }
    else
    Swal.fire({
      title: "Error al cambiar contraseña",
      text: "Las contraseñas no coinciden",
      icon: "error"
    });
  }


}
