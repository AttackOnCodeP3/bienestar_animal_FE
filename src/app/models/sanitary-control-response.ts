/**
 * SanitaryControlResponse model represents the response structure for sanitary control data.
 * @author dgutierrez
 */
export class SanitaryControlResponse {
  id: number | null;
  name: string | null;
  description: string | null;

  constructor(values: Partial<SanitaryControlResponse> = {}) {
    this.id = values.id ?? null;
    this.name = values.name ?? null;
    this.description = values.description ?? null;
  }
}
