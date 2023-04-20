
export class Random {
    getNumberBelowLimit(limit : number): number {     
        return Math.floor(Math.random() * limit);
    }
};