export class Secrets {
    static getGoogleMapsApiKey() {
        return process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
    }
}