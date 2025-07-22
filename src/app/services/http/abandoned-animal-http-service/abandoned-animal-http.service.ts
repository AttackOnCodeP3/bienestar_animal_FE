import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {Constants} from '@common/constants/constants';
import {AlertTypeEnum} from '@common/enums';
import {FormGroup} from '@angular/forms';
import {AbandonedAnimal} from '../../../models/abandoned-animal';
import {
  CreateAbandonedAnimalRequestDTO
} from '../../../models/dto/abandoned-animal/create-abandoned-animal-request.dto';


/**
 * HTTP service for managing abandoned animal records.
 * Handles save operations and future fetches.
 * @author gjimenez
 */
@Injectable({
  providedIn: 'root'
})
export class AbandonedAnimalHttpService extends BaseHttpService<AbandonedAnimal> {

  protected override source = Constants.ANIMALS_ABANDONED_URL;

  readonly abandonedAnimalList = signal<AbandonedAnimal[]>([]);

  /**
   * Registers an abandoned animal using a DTO.
   * Optionally runs a callback after success.
   *
   * @param dto Abandoned animal DTO
   * @param callback Optional callback to execute after success
   * @author gjimenez
   */
  save(dto: CreateAbandonedAnimalRequestDTO, callback?: VoidFunction): void {
    this.add(dto).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message
        });
        if (callback) callback();
      },
      error: this.handleError({
        message: 'Error registering abandoned animal',
        context: `${this.constructor.name}#save`
      })
    });
  }
}
