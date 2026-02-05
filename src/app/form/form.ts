import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HousingService} from '../housing.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `<section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">

          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">
          <p *ngIf="applyForm.get('firstName')?.invalid && applyForm.get('firstName')?.touched" class="error-text">
            First name is required
          </p>

          <label for="telefono">Telefono</label>
          <input id="telefono" type="text" formControlName="telefono">
          <p *ngIf="applyForm.get('telefono')?.invalid && applyForm.get('telefono')?.touched" class="error-text">
            telephone is required
          </p>

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <p *ngIf="applyForm.get('email')?.invalid && applyForm.get('email')?.touched" class="error-text">
            Valid email is required
          </p>

          <label for="date">Fecha deseada de visita</label>
          <input id="date" type="date" formControlName="date">



          <label for="mensaje">Comentarios</label>
          <textarea id="mensaje" formControlName="mensaje"></textarea>

          <label for="privacidad">Acepto politica de privacidad</label>
          <input type="checkbox" formControlName="privacidad">
          <p *ngIf="applyForm.get('privacidad')?.invalid && applyForm.get('privacidad')?.touched" class="error-text">
            Is required
          </p>


          <button type="submit" class="primary" [disabled]="applyForm.invalid">Apply now</button>

        </form>
      </section>`,
  styleUrl: './form.css'
})

export class FormComponent implements OnInit {

  housingService = inject(HousingService);

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    date: new FormControl('', Validators.required),
    privacidad: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    const savedData = localStorage.getItem('applicationData');
    if (savedData) this.applyForm.patchValue(JSON.parse(savedData));
    if(savedData){
      alert("Ya has solicitado visita el dia ")
    }

  }

  submitApplication() {
    if (this.applyForm.valid) {
      localStorage.setItem('applicationData', JSON.stringify(this.applyForm.value));
      // Guarda los datos en localStorage

      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.telefono ?? '',
        this.applyForm.value.email ?? '',
        this.applyForm.value.date ?? '',
        this.applyForm.value.privacidad ?? ''

      );


      alert('¡Solicitud enviada!');
    }
  }
}
