/**
 * Role model representing a user role in the system.
 * @author dgutierrez
 */
export class Role {
  id: number | null;
  name: string | null;
  description: string | null;

  constructor(values: Partial<Role> = {}) {
    this.id = values.id || null;
    this.name = values.name || null;
    this.description = values.description || null;
  }
}
