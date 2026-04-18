import { session } from 'wix-storage';

$w.onReady(() => {
    const loader = $w('#customPreloader');
    const hasVisited = session.getItem("firstVisitDone");

    if (hasVisited === "yes") {
        // Déjà visité : On supprime le loader immédiatement sans animation
        if (loader) loader.remove();
        // On affiche le site direct (pour contrer le CSS Global)
        import('wix-window-frontend').then((wixWindow) => {
             // On force l'opacité si on a mis le CSS Global
             // document.body.classList.add('site-ready'); // si utilisé via Custom Element
        });
    } else {
        // Première visite : On laisse le loader et on marque la session
        setTimeout(() => {
            if (loader) {
                loader.setAttribute('status', 'done');
                session.setItem("firstVisitDone", "yes");
            }
        }, 800); // Temps pour apprécier le Lottie
    }
});