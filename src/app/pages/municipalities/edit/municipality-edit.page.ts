import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MunicipalityHttpService } from '@services/http';
import { Municipality } from '@models';
import { UpdateMunicipalityRequestDTO } from '@models/dto';
import { AlertService } from '@services/general';
import { AlertTypeEnum } from '@common/enums';

@Component({
  selector: 'app-municipality-edit',
  standalone: true,
  templateUrl: './municipality-edit.page.html',
  styleUrls: ['./municipality-edit.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class MunicipalityEditPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly municipalityHttpService = inject(MunicipalityHttpService);
  private readonly alertService = inject(AlertService);

  statusOptions: string[] = ['ACTIVE', 'DEACTIVATED', 'ARCHIVED'];

  form = this.fb.group({
    id: [null as number | null],
    name: ['', Validators.required],
    address: [''],
    phone: [''],
    email: ['', [Validators.required, Validators.email]],
    cantonId: [null as number | null, Validators.required],
    responsibleName: [''],
    responsiblePosition: [''],
    status: ['', Validators.required]
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.municipalityHttpService.find(id).subscribe((response) => {
      const municipality = response.data;

// Removed the console.log statement as it is not suitable for production.

      this.form.patchValue({
        id: municipality.id,
        name: municipality.name,
        address: municipality.address ?? '',
        phone: municipality.phone ?? '',
        email: municipality.email,
        cantonId: municipality.canton?.id ?? null,
        responsibleName: municipality.responsibleName ?? '',
        responsiblePosition: municipality.responsibleRole ?? '',
        status: municipality.status
      });
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: 'Form is invalid'
      });
      return;
    }

    const dto: UpdateMunicipalityRequestDTO = {
      id: this.form.value.id!,
      name: this.form.value.name!,
      email: this.form.value.email!,
      address: this.form.value.address || '',
      phone: this.form.value.phone || '',
      cantonId: this.form.value.cantonId!,
      responsibleName: this.form.value.responsibleName || '',
      responsiblePosition: this.form.value.responsiblePosition || '',
      status: this.form.value.status || ''
    };

    console.log('Sending DTO:', dto);

    this.municipalityHttpService.update(dto);
  }
}
