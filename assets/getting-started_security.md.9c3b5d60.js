import{_ as s,o as t,c as e,Q as a}from"./chunks/framework.1c197a91.js";const E=JSON.parse('{"title":"Security","description":"","frontmatter":{},"headers":[],"relativePath":"getting-started/security.md","filePath":"getting-started/security.md","lastUpdated":1696780574000}'),o={name:"getting-started/security.md"},n=a('<h1 id="security" tabindex="-1">Security <a class="header-anchor" href="#security" aria-label="Permalink to &quot;Security&quot;">​</a></h1><p>Vuelr does <strong>not</strong> sanitize the code passed to it and will execute it as-is using <code>eval()</code>. It is therefore important to not pass any user input directly to the Vuelr component.</p><p>As an exaggerated example, <strong>do not do this</strong>, or anything similar to this:</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">Vuelr</span><span style="color:#E1E4E8;"> :</span><span style="color:#B392F0;">code</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$route.query.code</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">Vuelr</span><span style="color:#24292E;"> :</span><span style="color:#6F42C1;">code</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$route.query.code</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> /&gt;</span></span></code></pre></div>',4),r=[n];function l(p,c,i,d,u,y){return t(),e("div",null,r)}const g=s(o,[["render",l]]);export{E as __pageData,g as default};