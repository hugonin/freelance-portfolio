// Fichier : public/preloader.js

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .loader-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000000; /* Ta couleur de fond */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 99999;
      transition: opacity 0.8s ease, visibility 0.8s;
      pointer-events: auto;
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