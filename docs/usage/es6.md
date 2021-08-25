# ES6

You may use ES6 modules within your `<script>` tags. Vuelr will automatically determine if the code has to be transpiled for the current browser and load the `@babel/standalone`. For browsers that already support ES6, the `@babel/standalone` will not be imported.
