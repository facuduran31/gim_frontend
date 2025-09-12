import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socio } from 'src/app/models/socio';
import { SociosService } from 'src/app/services/socios.service';
import Swal from 'sweetalert2';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-form-socios',
  templateUrl: './form-socios.component.html',
  styleUrls: ['./form-socios.component.css']
})
export class FormSociosComponent {

  modoEditar: boolean = false;
  

  @Input() socio: Socio = new Socio(0, "", "", "", "", false, 0);

  planes:Array<Plan>=[];



  constructor(private sociosService: SociosService, private route: ActivatedRoute, private planService: PlanService) { }

  inputDniSocio: string = "";
  inputNombreSocio: string = "";
  inputApellidoSocio: string = "";
  inputTelefonoSocio: string = "";
  inputEstadoSocio: boolean = false;
  plan:Plan=this.planes[0];


  ngOnInit() {
    this.inputDniSocio = this.socio.dni;
    this.inputNombreSocio = this.socio.nombre;
    this.inputApellidoSocio = this.socio.apellido;
    this.inputTelefonoSocio = this.socio.telefono;
    this.inputEstadoSocio = this.socio.estado;
     this.route.paramMap.subscribe(params => {
      this.socio.idGimnasio = parseInt(params.get('id') || '0')
    });
    this.planService.getPlans().subscribe((res:any)=>{
      res.forEach((plan:any)=>{
        this.planes.push(new Plan(plan.idPlan, plan.nombre, plan.descripcion, plan.precio, plan.duracion, plan.diasPorSemana, plan.idGimnasio))
      })
    })
  }




  editarSocio() {

  }


  crearSocio() {
    this.socio.dni = this.inputDniSocio;
    this.socio.nombre = this.inputNombreSocio;
    this.socio.apellido = this.inputApellidoSocio;
    this.socio.telefono = this.inputTelefonoSocio;
    this.socio.estado = this.inputEstadoSocio;
    this.sociosService.createSocio(this.socio).subscribe((res: any) => {
      Swal.fire({
        title: 'Socio creado con exito',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#00aa00',
      }).then((result) => {
        window.location.reload(); // Recarga la página
      })
    },
      (error) => {
        Swal.fire({
          title: 'Error al crear el socio',
          text: error.error,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0000aa'
        })
      });
  }

}
