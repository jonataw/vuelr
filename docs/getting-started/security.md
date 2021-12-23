# Security

Vuelr does **not** sanitize the code passed to it and will execute it as-is. It is therefore important to not pass any user input directly to the Vuelr component, unless you perform proper sanitization on the input.

Read more about [Cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting).

As an exaggerated example, **do not do this**, or anything similar to this:

```vue
<Vuelr :code="$route.query.code" />
```
