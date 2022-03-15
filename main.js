const doc = document;
const STYLE_ID = '_dark_mode_style_';
const COLOR_SCHEME_CHANGE = 'colorschemechange';

// See https://html.spec.whatwg.org/multipage/common-dom-interfaces.html ↵
// #reflecting-content-attributes-in-idl-attributes.
const installStringReflection = (obj, attrName, propName = attrName) => {
  Object.defineProperty(obj, propName, {
    enumerable: true,
    get() {
      const value = this.getAttribute(attrName);
      return value === null ? '' : value;
    },
    set(v) {
      this.setAttribute(attrName, v);
    },
  });
};

class DarkMode extends HTMLElement {
  static get observedAttributes() {
    return ['mode'];
  }
  constructor() {
    super();
    window.matchMedia('(prefers-color-scheme: light)').onchange = (event) => {
      this.mode = event.matches ? "light" : "dark";
      this._changeThemeTag();
    }
    window.matchMedia('(prefers-color-scheme: dark)').onchange = (event) => {
      this.mode = event.matches ? "dark" : "light";
      this._changeThemeTag();
    }
    
    const observer = new MutationObserver((mutationsList, observer) => {
      this.mode = document.body.dataset.colorMode;
      this._changeContent();
      this._dispatchEvent(COLOR_SCHEME_CHANGE, { colorScheme: this.mode });
    });
    // 以上述配置开始观察目标节点
    observer.observe(doc.body, { attributes: true });
    // 之后，可停止观察
    // observer.disconnect();
    this._initializeDOM();
  }
  connectedCallback() {
    installStringReflection(this, 'mode');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.mode = 'dark';
      this._changeThemeTag();
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      this.mode = 'light';
      this._changeThemeTag();
    }
  }
  _changeThemeTag() {
    doc.body.setAttribute('data-color-mode', this.mode);
  }
  _changeContent() {
    this.icon.textContent = this.mode === 'light' ? '🌒' : '🌞';
    this.text.textContent = this.mode === 'light' ? this.getAttribute('dark') : this.getAttribute('light');
  }
  _initializeDOM() {
    var shadow = this.attachShadow({ mode: 'open' });
    this.label = doc.createElement('span');
    this.label.setAttribute('class', 'wrapper');
    this.label.onclick = () => {
      this.mode = this.mode === 'light' ? 'dark' : 'light';
      this._changeThemeTag();
      this._changeContent();
    }
    shadow.appendChild(this.label);
    this.icon = doc.createElement('span');
    this.label.appendChild(this.icon);

    this.text = doc.createElement('span');
    this.label.appendChild(this.text);
    this._changeContent();

    const textContent = `
[data-color-mode*='dark'] {
  color-scheme: dark;
  --color-thme-bg: #0d1117;
  --color-thme-text: #fff;
  background-color: var(--color-thme-bg);
  color: var(--color-thme-text);
}

[data-color-mode*='light'] {
  color-scheme: light;
  --color-thme-bg: #fff;
  --color-thme-text: #282c34;
  background-color: var(--color-thme-bg);
  color: var(--color-thme-text);
}`;

    const styleDom = doc.getElementById(STYLE_ID);
    
    if (!styleDom) {
      var initstyle = doc.createElement('style');
      initstyle.id = STYLE_ID;
      initstyle.textContent = textContent;
      doc.head.appendChild(initstyle);
    }

    var customStyle = this.getAttribute('style');
    var style = doc.createElement('style');
    style.textContent = `
    .wrapper { cursor: pointer; user-select: none; position: relative; ${customStyle ? customStyle : ''} }
    .wrapper > span + span { margin-left: .4rem; }
    `;
    shadow.appendChild(style);
  }
  _dispatchEvent(type, value) {
    this.dispatchEvent(new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail: value,
    }));
  }
}

customElements.define('dark-mode', DarkMode);