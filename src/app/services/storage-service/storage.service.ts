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
   * Retrieves a value from localStorage and parses it as JSON.
   * Defaults to `string` if no generic type is provided.
   *
   * @template T The expected type of the returned value. Defaults to `string`.
   * @param key The localStorage key to retrieve.
   * @returns The parsed value if it exists and is valid JSON, or `null` otherwise.
   * @author dgutierrez
   */
  get<T = string>(key: string): T | null {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
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
