/**
 * SanitaryControlType model represents the type of sanitary control applied to an animal.
 * @author dgutierrez
 */
export class SanitaryControlType {
  id: number | null;
  name: string | null;
  description: string | null;

  constructor(values: Partial<SanitaryControlType> = {}) {
    this.id = values.id ?? null;
    this.name = values.name ?? null;
    this.description = values.description ?? null;
  }
}
