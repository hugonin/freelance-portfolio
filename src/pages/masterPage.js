import { timeline } from 'wix-animations';

$w.onReady(async () => {

  // ── 1. S'assure que le preloader est visible au chargement ──
  $w('#preloader').show();
  $w('#preloader').style.opacity = "1";

  // ── 2. Animation d'entrée du logo ──
  await timeline()
    .add($w('#preloaderLogo'), {
      duration: 600,
      opacity:  1,
      translate: { x: 0, y: 0 },
    })
    .play();

  // ── 3. Attendre que la page soit prête ──
  await waitForPageLoad();

  // ── 4. Animation de sortie du preloader ──
  await timeline()
    .add($w('#preloader'), {
      duration: 500,
      opacity:  0,
    })
    .play();

  // ── 5. Cache définitivement le preloader ──
  $w('#preloader').hide();
});

// ── Attente du chargement complet de la page ──
function waitForPageLoad() {
  return new Promise(resolve => {
    setTimeout(resolve, 1500); // Délai minimum en ms — ajuste selon tes besoins
  });
}
