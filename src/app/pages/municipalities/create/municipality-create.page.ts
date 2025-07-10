import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MunicipalityHttpService} from '@services/http';
import {CreateMunicipalityRequestDTO} from '@models/dto';

@Component({
  selector: 'app-municipality-create',
  standalone: true,
  templateUrl: './municipality-create.page.html',
  styleUrls: ['./municipality-create.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class MunicipalityCreatePage {
  private readonly fb = inject(FormBuilder);
  private readonly municipalityHttpService = inject(MunicipalityHttpService);

  form = this.fb.group({
    name: ['', Validators.required],
    address: [''],
    phone: [''],
    email: ['', [Validators.required, Validators.email]],
    cantonId: [null as number | null, Validators.required],
    responsibleName: [''],
    responsiblePosition: ['']
  });

  submit(): void {
    if (this.form.valid) {
      const dto = {
        name: this.form.value.name!,
        address: this.form.value.address || '',
        phone: this.form.value.phone || '',
        email: this.form.value.email!,
        cantonId: Number(this.form.value.cantonId),
        responsibleName: this.form.value.responsibleName || '',
        responsiblePosition: this.form.value.responsiblePosition || ''
      };
      this.municipalityHttpService.save(dto);
    }
  }

}
