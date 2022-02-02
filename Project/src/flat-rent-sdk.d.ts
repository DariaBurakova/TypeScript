declare module 'flat-rent-sdk'{
export interface DataBase{
    id:string,
    title:string,
    details:string,
    photos:string[],
    coordinates:number[],
     bookedDates:[],
     price:number
    }
export interface Parametrs{
        city: string;
        checkInDate: Date;
        checkOutDate: Date;
        priceLimit?: number;
}

export function cloneDate(date:Date):Date
export function addDays(date:Date, days:number):Date 
export const backendPort:number
export const localStorageKey :string
export class FlatRentSdk{
    constructor()
    get(id:string):{}
    search(parametrs:Parametrs):{}
    book(flatId:string|number,checkInDate:Date):number
    _assertDatesAreCorrect(checkInDate:Date, checkOutDate:Date):void
    _resetTime(date:Date):void
    _calculateDifferenceInDays(startDate:Date, endDate:Date):number
    _generateDateRange(from:Date, to:Date):Date[]
    _generateTransactionId ():number
    _areAllDatesAvailable():number
    _formatFlatObject():{}
    _readDatabase():object|[]
    _writeDatabase(database:object|[]):void
    _syncDatabase(database:object|[]):void

}
}




