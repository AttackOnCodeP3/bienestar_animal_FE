import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlbViewerComponent } from '@components/model3D';
import { Model3DAnimalHttpService } from '@services/http';


@Component({
  selector: 'app-model-3d',
  imports: [GlbViewerComponent],
  templateUrl: './model-3d.html',
  styleUrl: './model-3d.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestGlbViewer {

  readonly model3DService = inject(Model3DAnimalHttpService);

  /**TO DO
   * ID de animal de ejemplo para pruebas (ocupo que haya un boton que llame al endpoint"{{base_url}}model3d-animal/createTaskV25" dropdown con los animales asociados al usuario que esta conectado, para que ese dato se guarde en una variabletestAnimalId para que se envie como parametro a la generacion del modelo y si el modelo no existe se muestra un pup up de error, por favor crear modelo o elegir otra mascota )
   * @author nav
   */
  readonly testAnimalId = 1;

  /**
   * Test method to manually load animal model
   */
  testLoadAnimalModel(): void {
    console.log('Loading model for animal ID:', this.testAnimalId);
    this.model3DService.getByAnimalId(this.testAnimalId);
  }
}