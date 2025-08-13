import {Injectable} from '@angular/core';

/**
 * Service to handle file-related utilities, such as converting files to Base64 strings.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class FileUtilsService {

  constructor() {
  }

  /**
   * Converts a File object to a Base64 string.
   * @param file The File object to convert.
   * @author dgutierrez
   */
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
}
