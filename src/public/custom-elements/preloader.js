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
    }
    
    .loader-wrapper.fade-out {
      opacity: 0;
      visibility: hidden;
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

class CustomPreloader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Sécurité : Si après 5 secondes le loader est toujours là, on le dégage.
    setTimeout(() => {
      const container = this.shadowRoot.getElementById('container');
      if (container && !container.classList.contains('fade-out')) {
        container.classList.add('fade-out');
        setTimeout(() => this.remove(), 800);
      }
    }, 5000);
  }

  // Cette méthode sera appelée depuis Velo quand le site est prêt
  static get observedAttributes() {
    return ['status'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribut changé : ${name} = ${newValue}`);
    if (name === 'status' && newValue === 'done') {
      const container = this.shadowRoot.getElementById('container');
      container.classList.add('fade-out');

      // On retire complètement l'élément du DOM après l'animation
      setTimeout(() => this.remove(), 800);
    }
  }
}

customElements.define('custom-preloader', CustomPreloader);