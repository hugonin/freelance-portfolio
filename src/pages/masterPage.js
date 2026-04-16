import wixWindowFrontend from 'wix-window-frontend';

$w.onReady(function () {
    // On vérifie si l'utilisateur est sur mobile pour adapter l'animation si besoin
    const formFactor = wixWindowFrontend.formFactor;

    // Simulation du temps de chargement ou attente du chargement complet
    // On utilise un timeout léger pour s'assurer que l'animation est vue
    waitForLoading();
});

function waitForLoading() {
    // Optionnel : Tu peux attendre que des datasets spécifiques soient prêts ici
    
    // Animation de sortie (Fade out)
    $w("#preloader").hide("fade", { "duration": 800, "delay": 200 })
        .then(() => {
            console.log("Portfolio chargé avec succès");
        });
}