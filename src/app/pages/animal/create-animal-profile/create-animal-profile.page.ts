import {Component, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {AnimalBasicInfoFormComponent} from '@components/forms/animal';
import {MatExpansionModule} from '@angular/material/expansion';
import {RaceHttpService, SpeciesHttpService, SexHttpService} from '@services/http';
import {FormsService, I18nService} from '@services/general';

/**
 * Page for creating an animal profile.
 * @author dgutierrez
 */
@Component({
  selector: 'app-create-animal-profile',
  imports: [
    AnimalBasicInfoFormComponent,
    MatExpansionModule
  ],
  templateUrl: './create-animal-profile.page.html',
  styleUrl: './create-animal-profile.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class CreateAnimalProfilePage implements OnInit {

  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly raceHttpService = inject(RaceHttpService);
  private readonly sexHttpService = inject(SexHttpService);
  readonly speciesHttpService = inject(SpeciesHttpService);

  ngOnInit() {
    this.sexHttpService.getAll();
    this.speciesHttpService.getAll();
  }
}
