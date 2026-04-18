// Fichier : public/preloader.js

const template = document.createElement('template');
template.innerHTML = `
  <style>
  :host {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 2147483647 !important; /* Le Z-index maximum autorisé en 32-bit */
      pointer-events: none;
    }
    .loader-wrapper {
      position: fixed;
      inset: 0;
      background-color: #000000;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2147483647;
      pointer-events: auto;
      transition: opacity 0.8s ease;
    }
    
    .loader-wrapper.fade-out {
      opacity: 0;
      visibility: hidden;
      pointer-events: none; /* Sécurité supplémentaire */
      transition: opacity 0.8s ease, visibility 0.8s;
      pointer-events: none;
    }

    /* Exemple de Spinner minimaliste */
    .spinner {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255,255,255,.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
  <div id="container" class="loader-wrapper">
    <div class="spinner"></div>
  </div>
`;


// Éviter le flash : On injecte un style "Rideau" immédiatement
const styleInject = document.createElement('style');
styleInject.innerHTML = `
    body { opacity: 0 !important; } 
    custom-preloader { visibility: visible !important; }
`;
document.head.appendChild(styleInject);

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
                
                // CRUCIAL : On réaffiche le corps du site JUSTE AVANT la fin du loader
                setTimeout(() => {
                    document.body.classList.add('site-ready');
                    document.body.style.opacity = "1";
                }, 200);

                setTimeout(() => {
                    this.remove();
                }, 800);
            }
        }
    }
}

customElements.define('custom-preloader', CustomPreloader);