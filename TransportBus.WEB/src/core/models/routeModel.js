import { PatternModel } from "./patternModel";

export class RouteModel
{
    constructor(data) {
        this.id = data.id;
        this.shortName = data.shortName;
        this.longName = data.longName;
        this.type = data.type;
        this.color = data.color;
        this.textColor = data.textColor;
        this.patterns = data.patterns.map((patternData) => new PatternModel(patternData));
    }
}