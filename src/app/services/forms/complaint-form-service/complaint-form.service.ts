import {inject, Injectable} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {Complaint, ComplaintType} from '@models';
import {notSelectOptionValidator} from '@common/forms';
import {FileInput} from 'ngx-custom-material-file-input';
import {FormsService} from '@services/general';
import {ComplaintDto, CreateComplaintMultipartDto} from '@models/dto';

/**
 * Service for managing complaint form-related functionality.
 * This service can be expanded to include methods for handling complaint forms.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class ComplaintFormService {

  private readonly formsService = inject(FormsService);

  /**
   * Builds a reactive form for creating a complaint.
   * The form includes fields for complaint type, description, and file upload.
   * @returns A FormGroup representing the complaint form.
   * @author dgutierrez
   */
  buildComplaintForm(
    {
      isEditMode = false
    }: {
      isEditMode?: boolean
    } = {
      isEditMode: false
    }) {
    const fb = this.formsService.formsBuilder;
    const formGroup = fb.group({
      complaintType: fb.control<ComplaintType | null>(null, [Validators.required, notSelectOptionValidator]),
      description: fb.control<string>('', [Validators.required, Validators.maxLength(1000)]),
      observations: fb.control<string | null>(null, [Validators.maxLength(1000)]),
      file: fb.control<FileInput | null>(
        null,
        {
          validators: this.formsService.getFileValidators({
            acceptTypes: this.formsService.imageFileAcceptTypes.split(',').map(s => s.trim()),
            maxSizeInMB: 1,
            required: true
          }),
          nonNullable: true
        }
      )
    });

    if (isEditMode) {
      formGroup.get('file')?.clearValidators();
      formGroup.get('file')?.updateValueAndValidity();
    }

    return formGroup;
  }

  /**
   * Builds a CreateComplaintMultipartDto from the form values.
   * @param form The complaint form.
   * @param coords Optional coordinates for the complaint location.
   * @returns A CreateComplaintMultipartDto containing the form data.
   * @author dgutierrez
   */
  buildComplaintDtoFromForm(
    form: ReturnType<typeof this.buildComplaintForm>,
    coords?: { latitude: number, longitude: number }
  ): CreateComplaintMultipartDto {
    const {complaintType, description, file} = form.getRawValue();
    return new CreateComplaintMultipartDto({
      complaintTypeId: complaintType?.id ?? null,
      description: description ?? null,
      image: file?.files?.[0] ?? null,
      latitude: coords?.latitude ?? 0,
      longitude: coords?.longitude ?? 0
    });
  }

  /**
   * Patches the complaint form with data from a ComplaintType object.
   * @param form The complaint form to patch.
   * @param complaintDto The complaint object containing data to patch the form.
   * @author dgutierrez
   */
  patchFormWithComplaintData(form: FormGroup, complaintDto: ComplaintDto): void {
    const complaintTypeDTO = complaintDto.complaintTypeDTO;
    form.patchValue({
      complaintType: new ComplaintType({
        id: complaintTypeDTO?.id,
        description: complaintTypeDTO?.description,
      }),
      description: complaintDto.description,
      observations: complaintDto.observations ?? null,
      file: null
    });
  }

  /**
   * Retrieves the image file from the form.
   * @param form The complaint form.
   * @returns The image file if it exists, otherwise null.
   * @author dgutierrez
   */
  getImageFile(form: ReturnType<typeof this.buildComplaintForm>): File | null {
    const file = form.getRawValue().file;
    return file?.files?.[0] ?? null;
  }
}
