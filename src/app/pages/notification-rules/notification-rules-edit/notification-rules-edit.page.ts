import {Component, computed, effect, inject, OnInit} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatChip} from '@angular/material/chips';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {AlertService, FormsService, I18nService} from '@services/general';
import {AlertTypeEnum, PagesUrlsEnum, RouteParamsEnum} from '@common/enums';
import {GeneralContainerComponent} from '@components/layout';
import {Constants} from '@common/constants/constants';
import {NotificationRulesHttpService} from '@services/http';
import {INotificationRuleForm} from '@common/interfaces/forms';
import {MunicipalPreventiveCareConfigurationDTO} from '@models/dto';

@Component({
  selector: 'app-notification-rules-edit',
  imports: [
    FormsModule,
    GeneralContainerComponent,
    MatButton,
    MatChip,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './notification-rules-edit.page.html',
  styleUrl: './notification-rules-edit.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class NotificationRulesEditPage implements OnInit {
  readonly i18nService = inject(I18nService);
  readonly router = inject(Router);
  readonly notificationRulesHttpService = inject(NotificationRulesHttpService)
  readonly alertService = inject(AlertService)
  readonly route = inject(ActivatedRoute);
  readonly formsService = inject(FormsService);

  readonly form = this.createFormUpdateNotificationRule();

  readonly notificationRuleToUpdate = computed(() => this.notificationRulesHttpService.selectedConfigurationId());

  /**
   * Effect to synchronize the form with the selected notification rule data.
   * It updates the form values when a notification rule is selected.
   * @author dgutierrez
   */
  readonly syncFormWithSelectedNotificationRule = effect(() => {
    const rule = this.notificationRulesHttpService.selectedConfigurationId();
    if (rule) {
      this.updateFormWithNotificationRuleData(rule);
    }
  });

  ngOnInit() {
    this.initializeNotificationRuleToUpdate();
  }

  /**
   * Initializes the notification rule to update by fetching its configuration from the server.
   * @author dgutierrez
   */
  private initializeNotificationRuleToUpdate(): void {
    const notificationRuleId = Number(this.route.snapshot.paramMap.get(RouteParamsEnum.NOTIFICATION_RULE_ID));
    if (!this.validateNotificationRuleId(notificationRuleId)) {
      return;
    }

    this.notificationRulesHttpService.getConfigurationById(notificationRuleId)
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      });
      return;
    }

    this.updateNotificationRule();
  }

  /**
   * @author dgutierrez
   */
  private updateNotificationRule(): void {
    const dtoToUpdate = this.buildUpdateNotificationRuleRequestDTO();
    this.notificationRulesHttpService.updateConfiguration(dtoToUpdate.id ?? 0, dtoToUpdate, this.navigateToListNotificationRules.bind(this));
  }

  /**
   * Validates the notification rule ID.
   * If the ID is invalid, it displays an alert and navigates to the list of notification rules.
   * @param id The ID of the notification rule to validate.
   * @author dgutierrez
   */
  private validateNotificationRuleId(id: number | null): boolean {
    if (id === null || isNaN(id) || id <= 0) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_ID_TO_UPDATE
      });
      this.navigateToListNotificationRules();
      return false;
    }
    return true;
  }

  /**
   * @author dgutierrez
   */
  private createFormUpdateNotificationRule(): FormGroup<INotificationRuleForm> {
    const formsBuilder = this.formsService.formsBuilder;
    return formsBuilder.group<INotificationRuleForm>({
      id: formsBuilder.control(null, [Validators.required]),
      value: formsBuilder.control<number | null>(null, [Validators.required, Validators.min(1), Validators.max(12)]),
      type: formsBuilder.control<string | null>(null, [Validators.required]),
    });
  }

  /**
   * @author dgutierrez
   */
  private updateFormWithNotificationRuleData(
    dto: MunicipalPreventiveCareConfigurationDTO | null
  ) {
    if (dto) {
      this.form.patchValue({
        id: dto.id,
        value: dto.value,
        type: dto.type,
      });
    }
  }

  /**
   * @author dgutierrez
   */
  private buildUpdateNotificationRuleRequestDTO(): MunicipalPreventiveCareConfigurationDTO {
    const {id, value, type} = this.form.getRawValue();
    return new MunicipalPreventiveCareConfigurationDTO({
      id: id,
      value: value,
      type: type,
    });
  }

  /**
   * @author dgutierrez
   */
  navigateToListNotificationRules(): void {
    this.router.navigate([PagesUrlsEnum.NOTIFICATION_RULES_LIST]);
  }
}
