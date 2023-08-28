# DevEditor
![npm](https://img.shields.io/npm/v/deveditor) ![npm bundle size (version)](https://img.shields.io/bundlephobia/min/deveditor/1.0.1) ![GitHub release (by tag)](https://img.shields.io/github/downloads/khairnar2960/deveditor/v1.0.1/total) ![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hy/deveditor) ![npm](https://img.shields.io/npm/dy/deveditor) ![GitHub issues](https://img.shields.io/github/issues-raw/khairnar2960/deveditor) ![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/khairnar2960/deveditor)  

HTML Textarea functionality booster

```javascript
new DevEditor(selector, settings);
```

* selector `(Selector|Node)`
* settings `object`

### Deployment:

Using `dev.editor.js` file

```html
<script src="dev.editor.js"></script>
```
Using jsDeliver CDN

```html
<script src="https://cdn.jsdelivr.net/npm/deveditor@1.0.1/dev.editor.js"></script>
```
Using unpkg CDN

```html
<script src="https://unpkg.com/deveditor@1.0.1/dev.editor.js"></script>
```

### Uses:

**No option use**

```html
<textarea class="dev-editor"></textarea>
```

```html
<script>
	new DevEditor('.dev-editor', {
		AllowTabs: true,
		AutoIndent: true,
	});
</script>
```

**Want to initialize later?**

```html
<script>
	const editor = new DevEditor('.dev-editor', {
		AutoInit: false,
		AllowTabs: true,
		AutoIndent: true,
	});

	editor.start(); // initialize
</script>
```

**Want to stop editor?**

```html
<script>
	editor.stop(); // initialize
</script>
```

**Change instance settings later**

```html
<script>
	const editor = new DevEditor('.dev-editor', {
		AllowTabs: true,
		AutoIndent: true,
	});

	editor.AllowTabs = false;
	editor.AutoIndent = false;
</script>
```

### Author:
* [Harshal Khairnar](https://harshalkhairnar.com)