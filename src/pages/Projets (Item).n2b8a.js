import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async () => {
  try {
    const current = $w('#dynamicDataset').getCurrentItem();
    if (!current?._id) return;

    const res = await wixData
      .query('Import1')
      .ascending('sortOrder')
      .find();

    const items = res.items;
    const index = items.findIndex(p => p._id === current._id);

   const prev = items[index - 1] || items[items.length - 1];
   const next = items[index + 1] || items[0];

    setupNavButton('#btnPrev', '#titrePrecedent', prev);
    setupNavButton('#btnNext', '#titreSuivant', next);

  } catch (error) {
    console.error('Prev/Next error:', error);
  }
});

function setupNavButton(btnSelector, textSelector, projet) {
  if (!projet) {
    $w(btnSelector).collapse();
    return;
  }

  $w(btnSelector).expand();
  $w(textSelector).text = projet.title || projet.titreProjet;
  $w(btnSelector).onClick(() => {
    wixLocation.to(projet['link-projets-title']);
  });
}