// public/custom-elements/preloader.js

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      position: fixed !important;
      inset: 0 !important;
      z-index: 2147483647 !important;
      display: block !important;
    }
    .loader-wrapper {
      position: fixed;
      inset: 0;
      background-color: #000000; /* Ta couleur de fond */
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.6s ease;
    }
    .loader-wrapper.fade-out {
      opacity: 0;
    }
    /* Ton Spinner */
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255,255,255,0.1);
      border-top: 3px solid #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
  <div id="container" class="loader-wrapper">
    <div class="spinner"></div>
  </div>
`;

class CustomPreloader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() { return ['status']; }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'status' && newValue === 'done') {
            const container = this.shadowRoot.getElementById('container');
            if (container) {
                container.classList.add('fade-out');
                
                // On réaffiche le site proprement
                document.body.style.transition = "opacity 0.6s ease";
                document.body.style.opacity = "1";

                setTimeout(() => this.remove(), 600);
            }
        }
    }
}
customElements.define('custom-preloader', CustomPreloader);