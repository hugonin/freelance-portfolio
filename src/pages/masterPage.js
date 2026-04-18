import wixWindowFrontend from 'wix-window-frontend';

$w.onReady(function () {
    console.log("Velo: masterPage ready");

    // On attend que la page soit réellement chargée aux yeux de l'utilisateur
    // 1000ms est une valeur sûre pour un portfolio avec des images
    setTimeout(() => {
        const loader = $w('#customPreloader'); 
        
        if (loader) {
            console.log("Velo: Envoi du signal 'done' au loader");
            loader.setAttribute('status', 'done');
        } else {
            console.error("Velo: Impossible de trouver l'élément #customPreloader");
        }
    }, 1000); 
});