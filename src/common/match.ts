export function match(regex: RegExp, text: string): string {
  return (regex.exec(text) || [])[1];
}
