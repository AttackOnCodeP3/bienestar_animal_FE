import {Component, input, model, OnInit, output, OnDestroy, computed, Input} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {Canton, District, Neighborhood} from '@models';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsService, I18nService} from '@services/general';
import {AbstractControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Subscription} from 'rxjs';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-location-form',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class LocationFormComponent implements OnInit, OnDestroy {

  readonly formsService = input.required<FormsService>()
  readonly form = input.required<FormGroup>()
  readonly cantonsList = input.required<Canton[]>();
  readonly districtsList = model<District[] | null>(null);
  readonly neighbourhoodsList = model<Neighborhood[] | null>(null);
  readonly i18nService = input.required<I18nService>()

  private subs = new Subscription();

  selectedCanton = output<Canton>();
  selectedDistrict = output<District>();
  @Input() neighborhoodsList!: Neighborhood[];

  ngOnInit(): void {
    const cantonControl = this.formsService().getControl('canton', this.form());
    const districtControl = this.formsService().getControl('district', this.form());
    const neighborhoodControl = this.formsService().getControl('neighborhood', this.form());

    districtControl?.disable();
    neighborhoodControl?.disable();

    if (cantonControl) {
      this.subs.add(
        cantonControl.valueChanges.subscribe((canton: Canton) => {
          this.handleCantonChange(canton, districtControl, neighborhoodControl);
        })
      );
    }

    if (districtControl) {
      this.subs.add(
        districtControl.valueChanges.subscribe((district: District) => {
          this.handleDistrictChange(district, neighborhoodControl);
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Handles changes in the canton selection.
   * @param canton The selected canton.
   * @param districtCtrl The control for districts.
   * @param neighborhoodCtrl The control for neighborhoods.
   * @author dgutierrez
   */
  private handleCantonChange(canton: Canton, districtCtrl: AbstractControl | null, neighborhoodCtrl: AbstractControl | null): void {
    if (districtCtrl) {
      if (canton) {
        districtCtrl.enable();
        this.selectedCanton.emit(canton);
      } else {
        districtCtrl.reset();
        districtCtrl.disable();
        this.districtsList.set(null);
      }
    }

    if (neighborhoodCtrl) {
      neighborhoodCtrl.reset();
      neighborhoodCtrl.disable();
      this.neighbourhoodsList.set(null);
    }
  }



  /**
   * Handles changes in the district selection.
   * @param district The selected district.
   * @param neighborhoodCtrl The control for neighborhoods.
   * @author dgutierrez
   */
  private handleDistrictChange(district: District, neighborhoodCtrl: AbstractControl | null): void {
    if (neighborhoodCtrl) {
      if (district) {
        neighborhoodCtrl.enable();
        this.selectedDistrict.emit(district);
      } else {
        neighborhoodCtrl.reset();
        neighborhoodCtrl.disable();
        this.neighbourhoodsList.set(null);
      }
    }
  }
}
