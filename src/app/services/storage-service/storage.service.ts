import { Injectable } from '@angular/core';

/**
 * Service for managing localStorage operations.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * Retrieves and parses a value from localStorage.
   *
   * Automatically parses JSON and optionally uses a reviver function
   * to transform the parsed object into a specific class or structure.
   *
   * Also handles legacy cases of double-serialized values by attempting
   * a second parse if the first result is still a string.
   *
   * @template T The expected type of the returned value.
   * @param key The key in localStorage to retrieve.
   * @param reviver Optional function to transform the parsed data into an instance of T.
   * @returns The parsed and optionally transformed value, or `null` if the key does not exist or parsing fails.
   * @author dgutierrez
   */
  get<T>(key: string, reviver?: (data: any) => T): T | null {
    const raw = this.getRaw(key);
    if (!raw) return null;

    try {
      let parsed: any = JSON.parse(raw);

      return reviver ? reviver(parsed) : parsed;
    } catch (error) {
      console.error(`Failed to parse localStorage item with key "${key}"`, error);
      return null;
    }
  }

  /**
   * Retrieves a raw value from localStorage without parsing it.
   *
   * @param key The localStorage key to retrieve.
   * @returns The raw string value if it exists, or `null` otherwise.
   * @author dgutierrez
   */
  getRaw(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * Stores a value in localStorage after converting it to a JSON string.
   *
   * @template T The type of the value being stored.
   * @param key The localStorage key to store under.
   * @param value The value to store. It must be serializable to JSON.
   * @author dgutierrez
   */
  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Removes an item from localStorage by its key.
   *
   * @param key The localStorage key to remove.
   * @author dgutierrez
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clears all entries from localStorage.
   * Use with caution as this removes all persisted data.
   *
   * @author dgutierrez
   */
  clear(): void {
    localStorage.clear();
  }

  /**
   * Checks whether a given key exists in localStorage.
   *
   * @param key The localStorage key to check.
   * @returns `true` if the key exists, `false` otherwise.
   * @author dgutierrez
   */
  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
