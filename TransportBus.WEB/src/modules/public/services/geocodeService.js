import axios from 'axios';
import { Secrets } from '../../../core/utils/secrets';
export default class GeoCodeService {
    static async getLocation(address) {
        const params = { address: address, key: Secrets.getGoogleMapsApiKey() };
        return await axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params });
    }

    static async getAddress(lat, lng) {
        const params = { latlng: `${lat},${lng}`, key: Secrets.getGoogleMapsApiKey() };
        return await axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params });
    }
}