import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {CantonHttpService, MunicipalityHttpService} from '@services/http';
import {FormsService, I18nService} from '@services/general';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-municipality-create',
  templateUrl: './municipality-create.page.html',
  styleUrls: ['./municipality-create.page.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslatePipe
  ]
})
export class MunicipalityCreatePage implements OnInit {
  private readonly municipalityHttpService = inject(MunicipalityHttpService);
  readonly cantonHttpService = inject(CantonHttpService);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);

  /**
   * @author gjimenez
   * @modifiedby dgutierrez 10/07/2025 change the implementation to use FormsService
   */
  form = this.formsService.formsBuilder.group({
    name: ['', Validators.required],
    address: [''],
    phone: [''],
    email: ['', [Validators.required, Validators.email]],
    cantonId: [null as number | null, Validators.required],
    responsibleName: [''],
    responsiblePosition: ['']
  });

  ngOnInit() {
    this.cantonHttpService.getAll();
  }

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
