import wixData from "wix-data";
import wixLocation from "wix-location";

// ─────────────────────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────────────────────
const COLOR_ACTIVE   = "#1F4FFF";
const COLOR_INACTIVE = "#CFCFCB";

let activeCategoryId = null; // Stocke le title brut CMS du filtre actif

// ─────────────────────────────────────────────────────────────
// INITIALISATION
// ─────────────────────────────────────────────────────────────
$w.onReady(async () => {

  // 1. Déclaration des onItemReady EN PREMIER, avant tout .data
  $w('#repeaterFilters').onItemReady(($item, itemData) => {
    $item('#buttonFilter').label = itemData.title.toUpperCase();

    $item('#buttonFilter').onClick(() => {
      activeCategoryId = itemData.title; // Valeur brute CMS, jamais transformée
      updateUIStates();
      loadProjects(itemData.title);
    });
  });

  $w('#repeaterCards').onItemReady(($item, itemData) => {
    $item('#imageHero').src         = itemData.imageHero        || "";
    $item('#textTitle').text        = itemData.title            || "";
    $item('#shortDescription').text = itemData.shortDescription || "";

    // typeProjet est un tableau Tags → on prend le premier élément
    const tag = Array.isArray(itemData.typeProjet) && itemData.typeProjet.length > 0
      ? itemData.typeProjet[0]
      : null;

    if (tag) {
      $item('#tagCardText').text = tag.toUpperCase();
      $item('#tagCardContainer').expand();
    } else {
      $item('#tagCardContainer').collapse();
    }

    // URL complète déjà encodée par Wix (ex: /projets/beau%C3%A9-pure)
    $item('#btnGoProject').onClick(() => {
      wixLocation.to(itemData['link-projets-title']);
    });
  });

  // 2. Bouton TOUS
  $w('#btnAll').onClick(() => {
    activeCategoryId = null;
    updateUIStates();
    loadProjects(null);
  });

  // 3. Chargement initial
  await loadCategoryButtons();
  await loadProjects(null);
  updateUIStates();
});

// ─────────────────────────────────────────────────────────────
// CHARGEMENT DES BOUTONS DE FILTRE (collection TypeProjet)
// ─────────────────────────────────────────────────────────────
async function loadCategoryButtons() {
  try {
    const res = await wixData.query("TypeProjet").ascending("title").find();
    $w('#repeaterFilters').data = res.items;
  } catch (err) {
    console.error("❌ Erreur catégories :", err);
  }
}

// ─────────────────────────────────────────────────────────────
// CHARGEMENT DES PROJETS (collection Import1)
// ─────────────────────────────────────────────────────────────
async function loadProjects(categoryTitle = null) {
  try {
    let query = wixData.query("Import1");

    if (categoryTitle) {
      // typeProjet est un champ Tags → hasSome avec la valeur exacte CMS
      query = query.hasSome("typeProjet", [categoryTitle]);
    }

    const res = await query.find();

    // Vider puis réassigner pour forcer le refresh du répéteur
    $w('#repeaterCards').data = [];
    $w('#repeaterCards').data = res.items;

  } catch (err) {
    console.error("❌ Erreur projets :", err);
  }
}

// ─────────────────────────────────────────────────────────────
// GESTION VISUELLE DES BOUTONS
// ─────────────────────────────────────────────────────────────
function updateUIStates() {
  setButtonStyle($w('#btnAll'), $w('#lineAll'), !activeCategoryId);

  $w('#repeaterFilters').forEachItem(($item, itemData) => {
    setButtonStyle(
      $item('#buttonFilter'),
      $item('#lineFilter'),
      itemData.title === activeCategoryId
    );
  });
}

function setButtonStyle(button, line, isActive) {
  button.style.color = isActive ? COLOR_ACTIVE : COLOR_INACTIVE;
  isActive ? line.show() : line.hide();
}