import navigation from './navigationResources';
import routes from './routesResources';
import stops from './stopsResources';

const administrativeResourcesBg = {
    navigation: navigation.bg,
    routes: routes.bg,
    stops: stops.bg
}
  
const administrativeResourcesEn = {
    navigation: navigation.en,
    routes: routes.en,
    stops: stops.en
}

export default {
    bg: administrativeResourcesBg,
    en: administrativeResourcesEn
}