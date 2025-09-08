import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SociosService } from 'src/app/services/socios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-ingresos',
  templateUrl: './administrar-ingresos.component.html',
  styleUrls: ['./administrar-ingresos.component.css']
})
export class AdministrarIngresosComponent {


  constructor(private sociosService: SociosService) { }


  formIngreso = new FormGroup({
    dniSocio: new FormControl('', Validators.required)
  }
  )



  validarIngreso() {
    console.log('dddd')
    this.sociosService.validarIngreso(this.formIngreso.value.dniSocio!).subscribe((res: any) => {
      Swal.showLoading();
      Swal.fire({
        title: 'Ingreso validado con exito',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#00aa00',
      }).then((result) => {
        window.location.reload(); // Recarga la página
      })
    },
      (error) => {
        Swal.fire({
          title: 'Error al validar la inscripción',
          text: error,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0000aa'
        })
      })
  }

}
