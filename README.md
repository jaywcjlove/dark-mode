dark-mode
===

A custom element that allows you to easily put a Dark Mode 🌒 toggle. so you can initially adhere to your users' preferences according to [`prefers-color-scheme`](https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme), but also allow them to (optionally permanently) override their system setting for just your site.

## Installation

Install from npm:

```bash
npm install --save @wcj/dark-mode
```

Or, alternatively, use a `<script defer>` tag (served from unpkg's CDN):

CDN: [UNPKG](https://unpkg.com/@wcj/dark-mode/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/@wcj/dark-mode/) | [Githack](https://raw.githack.com/jaywcjlove/dark-mode/gh-pages/dark-mode.min.js) | [Statically](https://cdn.statically.io/gh/jaywcjlove/dark-mode/gh-pages/dark-mode.min.js)

```html
<script src="https://unpkg.com/@wcj/dark-mode" defer></script>
```

## Usage

There are two ways how you can use `<dark-mode>`:


```html
<dark-mode></dark-mode>
<dark-mode dark="Dark" light="Light" style="border: 1px solid red; font-size: 12px;"></dark-mode>
```

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
