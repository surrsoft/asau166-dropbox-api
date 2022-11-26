/**
 * убирает все пробелы в начале и конце, и заменяет все повторения пробелов одним пробелом
 * ID [[221126192954]] rev 1 1.0.0 2022-11-26
 * @param text
 */
export function textAdapt(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}
