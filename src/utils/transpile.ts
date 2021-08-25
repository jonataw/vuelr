// Utility for transpiling ES6 code into ES5 for playground and `v-play`
// Imported only on demand when needed
import { transform, disableScriptTags } from '@babel/standalone';

// Prevent Babel/Standalone from processing <script> tag insertions
if (typeof window !== 'undefined' && window && window.removeEventListener) {
  disableScriptTags();
}

// Our transpilation compiler method
export default function compileJs(code: string): string {
  if (!code) {
    return '';
  }
  return (
    transform(code, {
      sourceType: 'script',
      presets: ['es2015', 'es2016', 'es2017'],
      plugins: [
        // Not used as we need to import the helpers into the transpiled code
        // 'transform-runtime',
        'proposal-object-rest-spread',
      ],
    }).code || ''
  );
}
