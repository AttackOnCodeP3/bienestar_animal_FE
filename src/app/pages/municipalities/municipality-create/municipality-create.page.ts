import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {CantonHttpService, MunicipalityHttpService} from '@services/http';
import {AlertService, FormsService, I18nService} from '@services/general';
import {PagesUrlsEnum} from '@common/enums';
import {GeneralContainerComponent} from '@components/layout';
import {CreateMunicipalityRequestDTO} from '@models/dto';
import {Canton, Municipality} from '@models';

/**
 * Component for creating a new municipality.
 * @author gjimenez
 * @modifiedby dgutierrez 12/07/2025 refactor for more clean code and adjustments in the form
 */
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
    TranslatePipe,
    GeneralContainerComponent,
    MatIcon
  ]
})
export class MunicipalityCreatePage implements OnInit {
  private readonly alertService = inject(AlertService);
  private readonly municipalityHttpService = inject(MunicipalityHttpService);
  private readonly router = inject(Router);
  readonly cantonHttpService = inject(CantonHttpService);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);

  /**
   * @author gjimenez
   * @modifiedby dgutierrez 10/07/2025 change the implementation to use FormsService
   */
  readonly form = this.buildForm();

  ngOnInit() {
    this.cantonHttpService.getAll();
  }

  /**
   * Submits the form to create a new municipality.
   * @author gjimenez
   * @modifiedBy dgutierrez 12/07/2025 refactor for more clean code
   */
  submit(): void {
    if (this.form.invalid) {
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
   * @modifiedBy dgutierrez 10/07/2025 refactor for more clean code, and pass the form for reset
   */
  private registerMunicipality() {
    this.municipalityHttpService.save(this.buildCreateMunicipalityRequestDTO(), this.form);
  }

  /**
   * Builds the form for creating a municipality.
   * @author gjimenez
   * @modifiedBy dgutierrez 10/07/2025 refactor for more clean code
   */
  private buildForm() {
    return this.formsService.formsBuilder.group({
      name: new FormControl<string>('', [Validators.required]),
      address: new FormControl<string>(''),
      phone: new FormControl<string>(''),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      cantonId: new FormControl<number | null>(null, [Validators.required]),
      responsibleName: new FormControl<string>(''),
      responsibleRole: new FormControl<string>('')
    });
  }

  /**
   * Builds the request DTO for creating a municipality.
   * @author dgutierrez
   */
  private buildCreateMunicipalityRequestDTO(): CreateMunicipalityRequestDTO {
    const {cantonId, ...rest} = this.form.getRawValue();

    return CreateMunicipalityRequestDTO.fromMunicipality(new Municipality({
      ...rest,
      canton: new Canton({
        id: cantonId
      })
    }));
  }

  /**
   * Navigates to the municipalities list page.
   * @author dgutierrez
   */
  navigateToMunicipalitiesList() {
    this.router.navigate([PagesUrlsEnum.MUNICIPALITY_LIST]);
  }
}
