import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-necesito-ayuda',
  templateUrl: './necesito-ayuda.component.html',
  styleUrls: ['./necesito-ayuda.component.css']
})
export class NecesitoAyudaComponent {

  constructor(private userService: UsuarioService) { }

  needHelpForm = new FormGroup({
    subject: new FormControl('Nuevo mensaje de GymManagment'),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required])
  });


  sendEmail(){ //Cambiar alerts por modales con SweetAlert
    this.userService.sendEmail(this.needHelpForm.value).subscribe({
      next: (res) => {
        Swal.fire({
                    title: "Confirmado",
                    text: "Email enviado correctamente",
                    icon: "success"
                  });
        this.needHelpForm.reset();
      }
      , error: (error:any) => {
        console.error('Error al enviar el email:', error);
        Swal.fire({
                    title: "Error al enviar el email",
                    text: "Intenta de nuevo más tarde",
                    icon: "error"
                  });
      }
    });
  }

}
