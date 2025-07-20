import {Component, input, OnDestroy, OnInit, output} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import {Subscription} from 'rxjs';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {Constants} from '@common/constants/constants';
import {FormsService} from '@services/general';
import {Vaccine} from '@models';
import {IVaccineApplied} from '@common/interfaces';

/**
 * Component for the animal vaccination form.
 * This component provides a form for managing animal vaccinations.
 * @author dgutierrez
 */
@Component({
  selector: 'app-animal-vaccination-form',
  imports: [
    MatListModule,
    MatDatepickerToggle,
    MatDatepicker,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule
  ],
  templateUrl: './animal-vaccination-form.component.html',
  styleUrl: './animal-vaccination-form.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: Constants.changeDetectionStrategy
})
export class AnimalVaccinationFormComponent implements OnInit, OnDestroy {
  readonly vaccineList = input.required<Vaccine[]>()
  readonly formsService = input.required<FormsService>()
  readonly form = input.required<FormGroup>();

  /**
   * Emits the changes in the vaccines dates.
   * This output is used to notify the parent component about the changes in the vaccine application dates.
   * @author dgutierrez
   */
  readonly syncVaccinesDatesChange = output<IVaccineApplied[]>();

  /**
   * Subscription to track changes in selected vaccines.
   * This subscription is used to synchronize the dates array when the selected vaccines change.
   * @author dgutierrez
   */
  subscriptionSelectedVaccines: Subscription[] = [];

  get selectedVaccines() {
    return this.form().get('selectedVaccines') as FormControl<number[]>;
  }

  get vaccinesDates() {
    return this.form().get('vaccinesDates') as FormArray;
  }

  get vaccinesDatesGroups(): FormGroup[] {
    return this.vaccinesDates.controls as FormGroup[];
  }

  ngOnInit() {
    this.subscriptionSelectedVaccines.push(this.selectedVaccines.valueChanges.subscribe((ids) => this.syncDatesArray(ids)))
  }

  ngOnDestroy() {
    if (this.subscriptionSelectedVaccines) {
      this.subscriptionSelectedVaccines.forEach(sub => sub.unsubscribe());
    }
  }

  /**
   * Gets the name of the vaccine by its ID.
   * @param id The ID of the vaccine.
   * @author dgutierrez
   */
  getNameVaccine(id: number): string {
    return this.vaccineList().find(v => v.id === id)?.name ?? 'Without name';
  }

  /**
   * Synchronizes the dates array based on the selected vaccine IDs.
   * @param ids Array of selected vaccine IDs.
   * @author dgutierrez
   */
  private syncDatesArray(ids: number[]) {
    const oldValues = new Map<number, Date | null>();
    this.vaccinesDatesGroups.forEach(grp => {
      oldValues.set(grp.get('vaccineId')?.value, grp.get('applicationDate')?.value);
    });

    this.vaccinesDates.clear();

    ids.forEach(id => {
      const previousDate = oldValues.get(id) ?? null;

      const group = this.formsService().formsBuilder.group({
        vaccineId: [id],
        applicationDate: [previousDate, [Validators.required]]
      });

      group.get('applicationDate')?.valueChanges.subscribe(() => {
        this.emitVaccinesDates();
      });

      this.vaccinesDates.push(group);
    });

    this.emitVaccinesDates();
  }

  /**
   * Emits the vaccines dates to the parent component.
   * @author dgutierrez
   */
  private emitVaccinesDates() {
    const vaccinesArray: IVaccineApplied[] = this.vaccinesDatesGroups.map(grp => ({
      vaccineId: grp.get('vaccineId')?.value,
      applicationDate: grp.get('applicationDate')?.value
    }));
    this.syncVaccinesDatesChange.emit(vaccinesArray);
  }
}
