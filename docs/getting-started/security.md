# Security

Vuelr does **not** sanitize the code passed to it and will execute it as-is
using `eval()`. It is therefore important to not pass any user input directly to the
Vuelr component.

As an exaggerated example, **do not do this**, or anything similar to this:

```vue
<Vuelr :code="$route.query.code" />
```
