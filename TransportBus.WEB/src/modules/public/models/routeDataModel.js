import { decode } from "@googlemaps/polyline-codec";

export default class RouteDataModel{
    constructor(geometry) {
        this.lines = decode(geometry).map((point) => {
            return {
                lat: point[0],
                lng: point[1]
            };
        });
    }
}