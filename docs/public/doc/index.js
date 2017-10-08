webpackJsonp([3,7],{434:function(n,s){n.exports={content:'<p>Picidae 做的事情：</p>\n<pre><code>               (webpack/react)\ndocument files -&gt; picidae &lt;- theme(react)\n                     |\n                     |\n                     |\n                static pages\n                 (spa/ssr)\n</code></pre>\n<p>我说 Picidae，易扩展，自定义，优体验，那么下面就来具体说说都体现在哪里</p>\n<ol>\n<li>易扩展、自定义</li>\n</ol>\n<p>Picidae 中包括 commander/transformer/plugin/theme 四种可配置扩展的概念。</p>\n<ul>\n<li>commander (命令)<br>\nPicidae 中可自定义或者选择，自己想要的commander.\nPicidae 命令行工具基于第三方包 <a href="https://github.com/tj/commander.js/">commander</a></li>\n</ul>\n<p>在 <code>picidae.config.js</code> 中加入 <code>commanders</code> 配置</p>\n<pre><code class="hljs language-js">{\n    <span class="hljs-attr">commanders</span>: [<span class="hljs-string">&apos;./path/to/your/commander?query&apos;</span>]\n}</code></pre>\n<pre><code class="hljs language-js"><span class="hljs-comment">// `./path/to/your/commander`</span>\n\n<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">commander, opt, config, require</span>) </span>{\n    <span class="hljs-keyword">return</span> commander\n        .command(<span class="hljs-string">&apos;new [title]&apos;</span>)\n        .description(<span class="hljs-string">&apos;create a new markdown&apos;</span>)\n        .action(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">title</span>) </span>{\n            <span class="hljs-built_in">console</span>.log(title)\n        })\n}</code></pre>\n<ol start="2">\n<li>优体验</li>\n</ol>\n'}}});