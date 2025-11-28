const WebComponentSytlesheet = () => {
  const StyleSheet = new CSSStyleSheet();
  StyleSheet.replaceSync(/*css*/ `
    h3 {
      color: blue;
    }

    .default-slot {
      color: red;
    }

    .named-slot {
      color: green;
    }
  `);
  return StyleSheet;
};

const WebComponentTemplate = (attr) => {
  const template = document.createElement('template');
  template.innerHTML = /*html*/ `<h3>Hello, 
    <slot class="default-slot">World</slot>
    <slot name="subject" class="named-slot">!</slot>
  </h3>`;
  return template.content.cloneNode(true);
};

const WebComponentName = 'simple-hello';

class WebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [WebComponentSytlesheet()];
    this.shadowRoot.appendChild(WebComponentTemplate(this.attrProp));
  }

  connectedCallback() {
    console.log('connectedCallback');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');
  }
}

customElements.define(WebComponentName, WebComponent);
