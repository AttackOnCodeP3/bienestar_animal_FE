/**
 * Creates an array of page numbers for pagination, starting from 1 up to the given total.
 *
 * @param totalPages The total number of pages.
 * @returns An array of page numbers from 1 to totalPages.
 * @author dgutierrez
 */
export function createPageArray(totalPages: number): number[] {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}
