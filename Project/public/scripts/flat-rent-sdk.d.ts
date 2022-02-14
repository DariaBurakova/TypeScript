export function cloneDate(date: any): Date;
export function addDays(date: any, days: any): any;
export const backendPort: 3040;
export const localStorageKey: "flat-rent-db";
export class FlatRentSdk {
    database: any;
    /**
     * Get flat by ID.
     *
     * @param {string} id Flat ID.
     * @returns {Promise<Object|null>} Flat.
     */
    get(id: string): Promise<Object | null>;
    /**
     * Search for flats.
     *
     * @param {Object} parameters Search parameters
     * @param {string}parameters.city City name
     * @param {Date} parameters.checkInDate Check-in date
     * @param {Date} parameters.checkOutDate Check-out date
     * @param {number} [parameters.priceLimit] Max price for a night
     * @returns {Object[]} List of suitable flats.
     */
    search(parameters: {
        city: string;
        checkInDate: Date;
        checkOutDate: Date;
        priceLimit?: number | undefined;
    }): Object[];
    /**
     * Book flat.
     *
     * @param {number} flatId
     * @param {Date} checkInDate
     * @param {Date} checkOutDate
     * @returns {number}
     */
    book(flatId: number, checkInDate: Date, checkOutDate: Date): number;
    _assertDatesAreCorrect(checkInDate: any, checkOutDate: any): void;
    _resetTime(date: any): void;
    _calculateDifferenceInDays(startDate: any, endDate: any): number;
    _generateDateRange(from: any, to: any): Date[];
    _generateTransactionId: () => number;
    _areAllDatesAvailable(flat: any, dateRange: any): any;
    _formatFlatObject(flat: any, nightNumber: any): any;
    _readDatabase(): any;
    _writeDatabase(database: any): void;
    _syncDatabase(database: any): void;
}
