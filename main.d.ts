
export type ColorScheme = 'light' | 'dark';
export type ColorSchemeChangeEvent = CustomEvent<{ colorScheme: ColorScheme }>;
export class DarkMode extends HTMLElement {
  mode?: ColorScheme;
  dark?: string;
  light?: string;
  style?: React.CSSProperties;
}

declare global {
  interface HTMLElementTagNameMap {
    'dark-mode': DarkMode;
  }
  interface GlobalEventHandlersEventMap {
    'colorschemechange': ColorSchemeChangeEvent;
  }
  namespace JSX {
    interface IntrinsicElements {
      'dark-mode': DarkMode;
    }
  }
}
