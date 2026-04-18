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
        this._status = null;
    }

    static get observedAttributes() { return ['status']; }

    // Cette fonction se déclenche dès que l'élément est inséré dans la page
    connectedCallback() {
        console.log("Custom Element: Connecté au DOM");
        // Sécurité : si Velo a envoyé le status trop vite, on vérifie ici
        this.checkStatus();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Custom Element: Attribut ${name} changé de ${oldValue} à ${newValue}`);
        if (name === 'status') {
            this._status = newValue;
            this.checkStatus();
        }
    }

    checkStatus() {
        if (this._status === 'done') {
            const container = this.shadowRoot.getElementById('container');
            if (container) {
                container.classList.add('fade-out');
                
                // Réaffichage du site
                document.body.style.transition = "opacity 0.8s ease";
                document.body.style.opacity = "1";

                // Suppression propre
                setTimeout(() => this.remove(), 800);
            }
        }
    }
}
customElements.define('custom-preloader', CustomPreloader);