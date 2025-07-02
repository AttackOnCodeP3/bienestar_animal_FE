import {Component, input, model, output} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {Interest} from '@models';
import {MatList, MatListItem} from '@angular/material/list';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-interests',
  imports: [
    MatList,
    MatListItem,
    MatCheckbox,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class InterestsComponent {
  readonly listInterests = input<Interest[]>()
  readonly selectedInterests = model<Interest[]>([]);

  getIdValueToString(interest:Interest): string {
    return interest.id?.toString() || '';
  }

  /**
   * Checks if an interest is selected.
   * @param id The ID of the interest to check.
   * @return True if the interest is selected, false otherwise.
   * @author dgutierrez
   */
  isInterestSelected(id: number | null): boolean {
    if(!id) return false;

    return this.selectedInterests().some(interest => interest.id === id);
  }

  /**
   * Handles the selection or deselection of an interest.
   * @author dgutierrez
   * @param value The change event from the checkbox.
   */
  onSelectInterest(value: MatCheckboxChange): void {
    const {source} = value;
    const id = source.value;
    const idNumber = parseInt(id, 10);
    if (this.isInterestSelected(idNumber)) {
      this.selectedInterests.update(selected => selected.filter(selectedInterest => selectedInterest.id !== idNumber));
    } else {
      const interest = this.listInterests()?.find(interest => interest.id === idNumber);
      if (interest) {
        this.selectedInterests.update(selected => [...selected, interest]);
      }
    }
  }
}
