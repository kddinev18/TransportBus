import navigation from './navigationResources';
import routes from './routesResources';
import stops from './stopsResources';
import users from './usersResources';


const administrativeResourcesBg = {
    navigation: navigation.bg,
    routes: routes.bg,
    stops: stops.bg,
    users: users.bg
}
  
const administrativeResourcesEn = {
    navigation: navigation.en,
    routes: routes.en,
    stops: stops.en,
    users: users.en
}

export default {
    bg: administrativeResourcesBg,
    en: administrativeResourcesEn
}