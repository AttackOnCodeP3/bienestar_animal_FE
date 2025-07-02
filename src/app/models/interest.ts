/**
 * Model representing an interest.
 * @author dgutierrez
 */
export class Interest {
  id: number | null;
  name: string | null;
  description: string | null;

  constructor(values : Partial<Interest> = {}) {
    this.id = values.id || null;
    this.name = values.name || null;
    this.description = values.description || null;
  }
}
