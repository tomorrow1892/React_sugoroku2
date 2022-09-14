import { modalUnstyledClasses } from "@mui/material";

export default class PlayerStatus {
    constructor(icon, name, point, position, isBreak, isGoaled) {
        this.icon = icon;
        this.name = name;
        this.point = point;
        this.position = position;
        this.isBreak = isBreak;
        this.isGoal = isGoaled;
        
    }
}
