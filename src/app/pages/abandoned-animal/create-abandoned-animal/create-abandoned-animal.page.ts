import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';
import {
  CantonHttpService,
  DistrictHttpService,
  NeighborhoodHttpService,
  SpeciesHttpService,
  SexHttpService,
  AbandonedAnimalHttpService
} from '@services/http';
import { AlertService, I18nService } from '@services/general';
import { GeneralContainerComponent } from '@components/layout';
import { CreateAbandonedAnimalRequestDTO } from '../../../models/dto/abandoned-animal/create-abandoned-animal-request.dto';

@Component({
  selector: 'app-create-abandoned-animal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslatePipe,
    GeneralContainerComponent
  ],
  templateUrl: './create-abandoned-animal.page.html',
  styleUrls: ['./create-abandoned-animal.page.scss']
})
export class CreateAbandonedAnimalPage implements OnInit {

  private readonly fb = inject(FormBuilder);
  readonly i18nService = inject(I18nService);
  readonly alertService = inject(AlertService);

  readonly speciesHttp = inject(SpeciesHttpService);
  readonly sexHttp = inject(SexHttpService);
  readonly cantonHttp = inject(CantonHttpService);
  readonly districtHttp = inject(DistrictHttpService);
  readonly neighborhoodHttp = inject(NeighborhoodHttpService);
  readonly abandonedAnimalHttp = inject(AbandonedAnimalHttpService);

  readonly form = this.buildForm();

  ngOnInit(): void {
    this.speciesHttp.getAll();
    this.sexHttp.getAll();
    this.cantonHttp.getAll();
  }

  buildForm() {
    return this.fb.group({
      species: new FormControl<string | null>(null, [Validators.required]),
      sex: new FormControl<string | null>(null),
      estimatedAge: new FormControl<string | null>(null, [Validators.required]),
      physicalCondition: new FormControl<string | null>(null, [Validators.required]),
      behavior: new FormControl<string | null>(null, [Validators.required]),
      district: new FormControl<string | null>(null, [Validators.required]),
      neighborhood: new FormControl<string | null>(null, [Validators.required]),
      observations: new FormControl<string | null>(null),
      latitude: new FormControl<number | null>(null),
      longitude: new FormControl<number | null>(null),
      photoBase64: new FormControl<string | null>(null)
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      });
      return;
    }

    const dto = new CreateAbandonedAnimalRequestDTO(this.form.getRawValue());
    this.abandonedAnimalHttp.save(dto, this.form);
  }
}
