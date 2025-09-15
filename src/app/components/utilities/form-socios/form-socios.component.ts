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

  planes:Array<Plan>=[new Plan(0,'Seleccione un plan','',0,0,0,0)];



  constructor(private sociosService: SociosService, private route: ActivatedRoute, private planService: PlanService) { }

  inputDniSocio: string = "";
  inputNombreSocio: string = "";
  inputApellidoSocio: string = "";
  inputTelefonoSocio: string = "";
  inputEstadoSocio: boolean = false;
  inputPlan:Plan= this.planes[0];


  ngOnInit() {
    this.route.paramMap.subscribe(params =>{
      this.socio.idSocio=parseInt(params.get('idSocio') || '0');
      if(this.socio.idSocio>0){
        this.modoEditar=true;
        this.sociosService.getSocioById(this.socio.idSocio).subscribe((res:any)=>{
          this.socio.nombre=res.nombre;
          this.socio.apellido=res.apellido;
          this.socio.dni=res.dni;
          this.socio.estado=res.activo;
          this.socio.idGimnasio=res.idGimnasio;
          this.socio.telefono=res.telefono;
          this.inputDniSocio = this.socio.dni;
          this.inputNombreSocio = this.socio.nombre;
          this.inputApellidoSocio = this.socio.apellido;
          this.inputTelefonoSocio = this.socio.telefono;
          this.inputEstadoSocio = this.socio.estado;
        })
      }
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
