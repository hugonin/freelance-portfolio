import wixData from "wix-data";
import wixLocation from "wix-location";

// ─────────────────────────────────────────────────────────────
// SECTION PORTFOLIO - HOMEPAGE
// Projet à la une (manuel via isFeatured) + Répéteur latéral
// ─────────────────────────────────────────────────────────────

$w.onReady(async () => {

  $w('#repeaterSide').onItemReady(($item, itemData) => {
    $item('#imageCard').src      = itemData.imageHero || "";
    $item('#textCardTitle').text = itemData.title     || "";

    const tag = Array.isArray(itemData.typeProjet) && itemData.typeProjet.length > 0
      ? itemData.typeProjet[0] : null;
    $item('#tagCardText').text = tag ? tag.toUpperCase() : "";

    $item('#btnGoToProject').onClick(() => {
      wixLocation.to(itemData['link-projets-title']);
    });
  });

  await loadPortfolioSection();
});

async function loadPortfolioSection() {
  try {

    // ── Projet à la une ──
    const featuredRes = await wixData.query("Import1")
      .eq("isFeatured", true)
      .limit(1)
      .find();

    if (featuredRes.items.length === 0) {
      console.warn("⚠️ Aucun projet marqué isFeatured");
      $w('#box149').collapse();
      return;
    }

    $w('#box149').expand();
    loadFeaturedProject(featuredRes.items[0]);

    // ── Répéteur latéral : 2 projets les plus récents hors featured ──
    const featuredId = featuredRes.items[0]._id;

    const sideRes = await wixData.query("Import1")
      .ne("_id", featuredId)
      .descending("_createdDate")
      .limit(2)
      .find();

    $w('#repeaterSide').data = [];
    $w('#repeaterSide').data = sideRes.items;

  } catch (err) {
    console.error("❌ Erreur section portfolio :", err);
  }
}

function loadFeaturedProject(item) {
  $w('#imageHeroFeatured').src  = item.imageHero        || "";
  $w('#textHeroFeatured').text  = item.title            || "";
  $w('#textDescFeatured').text  = item.shortDescription || "";

  const tag = Array.isArray(item.typeProjet) && item.typeProjet.length > 0
    ? item.typeProjet[0] : null;
  $w('#tagFeatured').text = tag ? tag.toUpperCase() : "";

  $w('#btnGoToFeatured').onClick(() => {
    wixLocation.to(item['link-projets-title']);
  });
}