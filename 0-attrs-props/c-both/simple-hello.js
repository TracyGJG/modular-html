const WebComponentSytlesheet = () => {
  const StyleSheet = new CSSStyleSheet();
  StyleSheet.replaceSync(/*css*/ `
    h3 {
      color: blue;
    }
  `);
  return StyleSheet;
};

const WebComponentTemplate = (attr) => {
  const template = document.createElement('template');
  template.innerHTML = /*html*/ `<h3>Hello,
    <span>${attr.who}</span>!
  </h3>`;
  return template.content.cloneNode(true);
};

const WebComponentName = 'simple-hello';

class WebComponent extends HTMLElement {
  static observedAttributes = ['who'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [WebComponentSytlesheet()];
    this.#render();
  }

  get who() {
    return this.getAttribute('who');
  }

  set who(_who) {
    this.setAttribute('who', _who);
    this.#render();
  }

  attributeChangedCallback(name, _oldVal, newVal) {
    if (WebComponent.observedAttributes.includes(name)) {
      this.#render();
    }
  }

  #render() {
    this.shadowRoot.childNodes.forEach((child) =>
      this.shadowRoot.removeChild(child)
    );
    this.shadowRoot.appendChild(WebComponentTemplate({ who: this.who }));
  }
}

customElements.define(WebComponentName, WebComponent);
