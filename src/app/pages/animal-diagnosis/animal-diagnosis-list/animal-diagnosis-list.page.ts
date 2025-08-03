import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { GeneralContainerComponent } from '@components/layout';
import { CommunityAnimalHttpService } from '@services/http/community-animal-http-service/community-animal-http.service';
import { TranslatePipe } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { FormsService } from '@services/general';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface AnimalDiagnosis {
  id: number;
  imagenUrl: string;
  description: string;
  createdAt: string;
  observacion: string;
  advertencia: string;
}

@Component({
  selector: 'app-animal-diagnosis-list',
  standalone: true,
  templateUrl: './animal-diagnosis-list.page.html',
  styleUrls: ['./animal-diagnosis-list.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    GeneralContainerComponent,
    TranslatePipe,
    MatIcon,
  ],
})
export class AnimalDiagnosisListPage implements OnInit {
  form!: FormGroup;
  animals: { id: number; name: string }[] = [];
  diagnoses: AnimalDiagnosis[] = [];
  loading = false;
  error: string | null = null;
  pageSize = 10;
  pageIndex = 0;
  totalElements = 0;
  readonly formsService = inject(FormsService);

  private readonly fb = inject(FormBuilder);
  private readonly animalService = inject(CommunityAnimalHttpService);
  private readonly http = inject(HttpClient);

  ngOnInit() {
    this.loading = true;
    this.form = this.fb.group({
      animalId: [null, Validators.required],
      image: [null, Validators.required],
      description: ['', Validators.required],
    });
    this.animalService.getMine();
    this.animals = this.animalService
      .communityAnimalListMine()
      .filter((a) => a.id !== null) as { id: number; name: string }[];
    this.loading = false;
  }

  onAnimalChange(): void {
    this.pageIndex = 0;
    this.loadDiagnoses();
  }

  loadDiagnoses(): void {
    const animalId = this.form.value.animalId;
    if (!animalId) return;
    this.loading = true;
    this.error = null;
    this.http
      .get<any>(
        `http://localhost:8080/diagnostico?animalId=${animalId}&page=${
          this.pageIndex + 1
        }&size=${this.pageSize}`
      )
      .subscribe({
        next: (data) => {
          this.diagnoses = Array.isArray(data) ? data : data.content;
          this.totalElements = data.totalElements ?? data.length ?? 0;
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar diagnósticos';
          this.loading = false;
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDiagnoses();
  }
}
