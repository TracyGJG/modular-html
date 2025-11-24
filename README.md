# Modular HTML

## Templates and Slots

Four example [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), two using the [Lit library](https://lit.dev/) and two using vanilla/native JS.

Each pair of implmentations have two varieties: One using a Shadow DOM and the other using a `light` DOM.

The index.html file is virtually identical for all examples. They only differ in the use of slots, which are not supported natively outside a Shadow DOM.

1. `native-shadow`: Vanilla JS using the Shadow DOM

2. `native-light`: Vanilla JS using the light DOM

3. `lit-shadow`: Lit JS using the Shadow DOM

4. `lit-light`: Lit JS using the light DOM

_LiteElement_ is the basic web component class we will be extending and customising for our needs. _html_ and _css_ are [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates), used to register the html template and styling of the custom component.

## Attributes and Properties

### Attributes are element values defined in the HTML.

#### HTML

```html
<custom-element attr1="one" attr2="two"></custom-element>
```

#### JS

```js
const customElement = document.querySelector('custom-element');

console.log(customElement.getAttribute.('attr1')); // Output to console: "one"

customElement.setAttribute('attr2', 'Update'); // HTML attr2 revised to: "Update"
```

### Properties are values of an element instance that we can access via JS code.

#### HTML

```html
<custom-element attr1="one"></custom-element>
```

#### JS

```js
const customElement = document.querySelector('custom-element');
```

## Events in and out

---
