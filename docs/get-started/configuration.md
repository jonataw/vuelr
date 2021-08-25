# Configuration

To pass options to Vuelr:

<SourceCode lang="javascript">
```javascript
Vue.use(Vuelr, {
  // Options here...
})
```
</SourceCode>

## All options

<SourceCode lang="javascript">
<<< @/../src/vuelr.d.ts#vuelrconfig
</SourceCode>

## Default configuration

<SourceCode lang="javascript">
```javascript
{
  debug: false,
  codemirror: {
    lineNumbers: true,
    mode: 'text/x-vue',
    tabSize: 2
  }
}
```
</SourceCode>
