export class PatternModel {
    constructor(data) {
        this.index = data.index;
        this.routeId = data.routeId;
        this.toStopId = data.toStopId;
        this.stops = data.stops;
        this.geometry = data.geometry;
        this.direction = data.direction;
        this.patternHash = data.patternHash;
    }
}