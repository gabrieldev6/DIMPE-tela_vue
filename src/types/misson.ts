export class MissionItem {
    no: number
    action: keyof typeof Action | string
    lat: number
    lon: number
    alt: number
    parameter1: number
    parameter2: number
    parameter3: number
    flag: number
    
    constructor(no: number, 
        action: keyof typeof Action | string, 
        lat: number, 
        lon: number, 
        alt: number, 
        parameter1: number, 
        parameter2: number, 
        parameter3: number,
        flag: number) {

       this.no = no
       this.action = action
       this.lat = lat
       this.lon = lon
       this.alt = alt
       this.parameter1 = parameter1
       this.parameter2 = parameter2
       this.parameter3 = parameter3
       this.flag = flag

    }
}

enum Action {
    WAYPOINT = 'WAYPOINT',
    PH_TIME = 'POSHOLD_TIME',
    POI = 'SET_POI',
    LAND = 'LAND'

}
