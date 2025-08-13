import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

interface GroupMember {
  name: string;
  role: string;
  email: string;
  photo: string;
    responsibilities: string[];
}

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
  imports: [
    MatCardModule,
    RouterModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutUsPage {
  readonly groupMembers: GroupMember[] = [
    {
      name: 'David Gutiérrez',
      role: 'Coordinador de desarrollo',
      email: 'dgutierrezc1@ucenfotec.ac.cr',
      photo: 'assets/david.jpg',
      responsibilities: [
        'Diseñar y mantener la arquitectura del proyecto y velar porque se respete durante la iteración.',
        'Revisar el nivel técnico de cada integrante antes de cada iteración: identificar bloqueos y reforzar habilidades.',
        'Realizar code reviews cumpliendo estándares y buenas prácticas.',
        'Guiar la integración de APIs, herramientas o componentes técnicos clave.',
        'Conocer y documentar la arquitectura general (incluyendo LLMs u otras integraciones importantes si aplican).',
        'Ser referencia técnica para resolver dudas complejas (p. ej., cómo implementar correctamente un CRUD).',
        'Promover colaboración técnica con sesiones de explicación, refuerzo y seguimiento de tareas.'
      ]
    },
    {
      name: 'Gianluca Jiménez',
      role: 'Coordinador de calidad',
      email: 'gjimenezj@ucenfotec.ac.cr',
      photo: 'assets/gianluca.jpg',
      responsibilities: [
        'Verificar que cada desarrollador genere planes y casos de prueba, y que ejecute las pruebas definidas.',
        'Revisar los casos de prueba creados por los desarrolladores.',
        'Entender el sistema de punta a punta: módulos, interacciones y dependencias.',
        'Supervisar pruebas de regresión para evitar impactos en funcionalidades existentes.',
        'Definir y comunicar criterios de aceptación claros (“Definition of Done”).',
        'Participar en validaciones y considerar dependencias entre historias o módulos al probar.'
      ]
    },
    {
      name: 'Nathalie Arcia Vindas',
      role: 'Coordinador general',
      email: 'narchiav@ucenfotec.ac.cr',
      photo: 'assets/nathalie.jpg',
      responsibilities: [
        'Asegurar que todas las personas del equipo tengan tareas asignadas.',
        'Revisar el avance y cumplimiento del plan.',
        'Mantener comunicación continua con el equipo y profesores ante cambios, bloqueos o dudas importantes.',
        'Proponer asignación de tareas cuando haya dudas o solapamientos.',
        'Administrar JIRA para visualizar progreso y facilitar la organización.',
        'Verificar que existan historias activas y en curso en JIRA.',
        'Promover el uso correcto del tablero (To Do, In Progress, Done).',
        'Dar seguimiento directo: motivar, organizar prioridades y ayudar con la planificación del tiempo.'
      ]
    },
    {
      name: 'Adrian Blanco Cordero',
      role: 'Coordinador de soporte',
      email: 'ablancoc@ucenfotec.ac.cr',
      photo: 'assets/adrian.jpg',
      responsibilities: [
        'Crear y configurar los repositorios de frontend y backend.',
        'Configurar ramas base: main, dev, qa, etc.',
        'Implementar la pipeline de CI/CD.',
        'Establecer y comunicar reglas de pull requests.',
        'Supervisar y ejecutar merges correctamente.',
        'Definir entornos (desarrollo, QA, producción) y su propósito.',
        'Validar merges hacia QA cuando un ticket finaliza; consolidar cambios diariamente a una hora fija (p. ej., 4:00 p.m.).',
        'Supervisar o realizar despliegues a producción (responsabilidad exclusiva para evitar errores).'
      ]
    }
  ];
}
