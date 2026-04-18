import wixWindowFrontend from 'wix-window-frontend';

$w.onReady(() => {
    // Si on est en mode aperçu, on cache le loader plus vite pour pas s'embêter
    const delay = wixWindowFrontend.viewMode === "Preview" ? 200 : 1000;

    // On laisse un petit délai pour le confort visuel
    setTimeout(() => {
        const preloader = $w('#customPreloader1'); // Vérifie l'ID de ton élément
        if (preloader) {
            preloader.setAttribute('status', 'done');
        }
    }, delay);
});