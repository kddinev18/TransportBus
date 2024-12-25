import navigationResources from "./navigationResources"
import routeVisualiserResources from "./routeVisualiserResources"

const publicResourcesBg = {
    transportMap: {
        navigation: navigationResources.bg,
        routeVisualiser: routeVisualiserResources.bg,
    }
}
  
const publicResourcesEn = {
    transportMap: {
        navigation: navigationResources.en,
        routeVisualiser: routeVisualiserResources.en,
    }
}

export default {
    bg: publicResourcesBg,
    en: publicResourcesEn
}