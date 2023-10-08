export function minifyCSS(style: string): string {
  let content = style;
  content = content.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '');
  content = content.replace(/ {2,}/g, ' ');
  content = content.replace(/ ([{:}]) /g, '$1');
  content = content.replace(/([;,]) /g, '$1');
  content = content.replace(/ !/g, '!');
  return content;
}
