import wixWindowFrontend from 'wix-window-frontend';

// masterPage.js
$w.onReady(() => {
    const loader = $w('#customPreloader');
    if (loader) {
        setTimeout(() => {
            loader.setAttribute('status', 'done');
            // Optionnel : Animation d'entrée du contenu
            $w('Document').scrollTo(0,0); // Force le scroll en haut
        }, 800);
    }
});


