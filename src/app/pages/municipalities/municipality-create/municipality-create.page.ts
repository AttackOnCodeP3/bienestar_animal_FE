import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Validators, ReactiveFormsModule, FormControl} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {CantonHttpService, MunicipalityHttpService} from '@services/http';
import {AlertService, FormsService, I18nService} from '@services/general';

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
  private readonly alertService = inject(AlertService);

  /**
   * @author gjimenez
   * @modifiedby dgutierrez 10/07/2025 change the implementation to use FormsService
   */
  readonly form = this.buildForm();

  ngOnInit() {
    this.cantonHttpService.getAll();
  }

  submit(): void {
    if (this.form.invalid){
      this.formsService.markFormTouchedAndDirty(this.form);
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      });
      return;
    }
    this.registerMunicipality();
  }

  /**
   * Registers a new municipality using the form data.
   * @author gjimenez
   * @modifiedBy dgutierrez 10/07/2025 refactor for more clean code
   */
  private registerMunicipality() {
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

  /**
   *
   * @author gjimenez
   * @modifiedBy dgutierrez 10/07/2025 refactor for more clean code
   */
  private buildForm() {
    return this.formsService.formsBuilder.group({
      name: new FormControl<string>('', [Validators.required]),
      address: new FormControl<string>(''),
      phone: new FormControl<string>(''),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      cantonId: [-1, Validators.required],
      responsibleName: new FormControl<string>(''),
      responsiblePosition: new FormControl<string>('')
    });
  }
}
