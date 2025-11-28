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

const WebComponentTemplate = () => {
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
    document.adoptedStyleSheets = [WebComponentSytlesheet()];
  }

  connectedCallback() {
    console.log(`connectedCallback: ${WebComponentName}`);

    // Retain all content of the instance
    const instanceContent = [...this.childNodes];

    // Replace the content of the instance with that in the template
    this.replaceChildren(WebComponentTemplate());

    // Look up default and named slots
    const defaultSlot = this.querySelector('slot:not([name])');
    const namedSlots = [...this.querySelectorAll('slot[name]')];

    // For Each named slot
    namedSlots.forEach((slot) => {
      // Look up the instance content for the named slot
      const sourceContentIndex = [...instanceContent].findIndex(
        (slottable) => slottable.getAttribute?.('slot') === slot.name
      );

      // When content is found, replace internals with the content
      if (sourceContentIndex >= 0) {
        slot.replaceChildren();
        slot.appendChild(instanceContent.splice(sourceContentIndex, 1)[0]);
      }
    });

    // Replace the default slot with any remaining content.
    if (defaultSlot && instanceContent.length) {
      defaultSlot.replaceChildren();
      instanceContent.forEach((contentNode) =>
        defaultSlot.appendChild(contentNode)
      );
    }
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');
  }
}

customElements.define(WebComponentName, WebComponent);
