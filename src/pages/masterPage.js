import wixWindowFrontend from 'wix-window-frontend';

$w.onReady(function () {
    console.log("Velo: masterPage ready");

    // On attend que la page soit réellement chargée aux yeux de l'utilisateur
    // 1000ms est une valeur sûre pour un portfolio avec des images
    setTimeout(() => {
        const loader = $w('#customPreloader');

        if (loader) {
            setTimeout(() => {
                loader.setAttribute('status', 'done');
                // Optionnel : Animation d'entrée du contenu
                $w('Document').scrollTo(0, 0); // Force le scroll en haut
            }, 800);


        }
    });