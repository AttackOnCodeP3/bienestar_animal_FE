import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '@common/constants/constants';


@Injectable({ providedIn: 'root' })
export class ImageUploadHttpService {
  private readonly baseUrl = Constants.appHost;
  private readonly http = inject(HttpClient);

  readonly imageUrl = signal<string | null>(null);
  readonly uploadError = signal<string | null>(null);
  readonly uploading = signal(false);

  uploadImage(
    file: File,
    onSuccess: (url: string) => void,
    onError: () => void
  ): void {
    const formData = new FormData();
    formData.append('file', file);
    this.uploading.set(true);
    this.uploadError.set(null);
    this.http
      .post<{ success: boolean; message: string; publicImageUrl: string }>(
        `${this.baseUrl}/model3d-animal/uploadPicture`,
        formData
      )
      .subscribe({
        next: (res) => {
          this.imageUrl.set(res.publicImageUrl);
          this.uploading.set(false);
          onSuccess(res.publicImageUrl);
        },
        error: () => {
          this.uploadError.set('Error uploading image');
          this.imageUrl.set(null);
          this.uploading.set(false);
          onError();
        },
      });
  }
}
