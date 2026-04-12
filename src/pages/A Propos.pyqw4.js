import wixData from "wix-data"
import wixLocation from "wix-location"

//-----------------------------------------------------------------------------
// INITIALISATION
//-----------------------------------------------------------------------------

$w.onReady(async () => {
    $w('#repeaterCards').onItemReady(($item, itemData) => {
        $item('#imageCard').src = itemData.imageHero || "";
        $item('#textCardTitle').text = itemData.title || "";
        $item('#textCardDescription').text = itemData.shortDescription || "";

        const tag = Array.isArray(itemData.typeProjet) && itemData.typeProjet.length > 0 ? itemData.typeProjet[0] : null

        if (tag) {
            $item('#tagCardText').text = tag.toUpperCase()
            $item('#tagCardContainer').expand()
        } else {
            $item('#tagCardContainer').collapse()
        }

        $item('#btnGoToProject').onClick(() => {
            wixLocation.to(itemData['link-projets-title'])
        })

    })

    await loadProjects(null)

});

//-----------------------------------------------------------------------------
// CHARGEMENT DES PROJETS
//-----------------------------------------------------------------------------
async function loadProjects(projectId = null) {
    try {
        let query = wixData.query("Import1")

        if (projectId) {
            query = query.eq('project', projectId)
        }
        const res = await query.descending("_createdDate").limit(2).find()
        $w('#repeaterCards').data = res.items;

    } catch (err) {
        console.error("❌ Erreur projets :", err);
    }

}