import axios from 'axios';
export default class BusNavigationService {
    static async getNavigation(from, to) {
        return await axios.post('https://www.telelink.city/api/v1/949021bc-c2c0-43ad-a146-20e19bbc3649/transport/planner/plan',
            {
                fromPlace: 
                {
                    lat: from.lat,
                    lon: from.lng
                },
                toPlace:
                {
                    lat: to.lat,
                    lon: to.lng
                },
                maxWalkDistance: 1200,
                walkingSpeed:1
            }
        );
    }
}