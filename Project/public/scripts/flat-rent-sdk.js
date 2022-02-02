const database = [
    {
        id: 'vnd331',
        title: 'Radisson Royal Hotel',
        details: 'Отель расположен в 4 минутах ходьбы от станции метро «Маяковская». К услугам гостей фитнес-центр и спа-центр с сауной и гидромассажной ванной.',
        photos: ['vnd331.png', 'vnd331.png'],
        coordinates: [59.9322936, 30.3460129],
        bookedDates: [],
        price: 12000
    },
    {
        id: 'ab2e2',
        title: 'Номера на Садовой',
        details: 'Расположен в 7 минутах ходьбы от Невского проспекта. К услугам гостей круглосуточная стойка регистрации и бесплатный Wi-Fi.',
        photos: ['ab2e2.png', 'ab2e2.png'],
        coordinates: [59.930325, 30.3291592],
        bookedDates: [],
        price: 4500
    },
    {
        id: 'mvm32l',
        title: 'Мини Отель на Невском 136',
        details: 'Мини-отель расположен в Санкт-Петербурге, в 5 минутах ходьбы от станции метро «Площадь Восстания» и Московского железнодорожного вокзала.',
        photos: ['mvm32l.png', 'mvm32l.png'],
        coordinates: [59.9299603, 30.3658932],
        bookedDates: [],
        price: 3800
    },
    {
        id: 'bvep12',
        title: 'Отель Усадьба Державина',
        details: 'Прекрасный отель недалеко от Исаакиевского собора с бесплатным Wi-Fi на всей территории.',
        photos: ['bvep12.png', 'bvep12.png'],
        coordinates: [59.9194966, 30.309389],
        bookedDates: [],
        price: 8700
    }
];
export function cloneDate(date) {
    return new Date(date.getTime());
}
export function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
}
export const backendPort = 3040;
export const localStorageKey = 'flat-rent-db';
export class FlatRentSdk {
    constructor() {
        this._generateTransactionId = () => {
            const min = 1000;
            const max = 9999;
            const num = Math.random() * (max - min) + min;
            return Math.floor(num);
        };
        if (this._readDatabase() == null) {
            this._writeDatabase(database);
        }
        this.database = this._readDatabase();
    }
    /**
     * Get flat by ID.
     *
     * @param {string} id Flat ID.
     * @returns {Promise<Object|null>} Flat.
     */
    get(id) {
        const flat = this.database.find((item) => {
            return item.id === id;
        });
        return Promise.resolve(flat == null ? flat : this._formatFlatObject(flat));
    }
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
    search(parameters) {
        return new Promise((resolve, reject) => {
            try {
                if (parameters.city != 'Санкт-Петербург') {
                    throw new Error(`Passed unsupported city - "${parameters.city}".`);
                }
                if (!(parameters.checkInDate instanceof Date) || !(parameters.checkOutDate instanceof Date)) {
                    throw new Error(`Passed invalid check-in or check-out date - from "${parameters.checkInDate}" to "${parameters.checkOutDate}".`);
                }
                this._assertDatesAreCorrect(parameters.checkInDate, parameters.checkOutDate);
                if (parameters.priceLimit != null && (isNaN(parameters.priceLimit) || !isFinite(parameters.priceLimit))) {
                    throw new Error(`Passed invalid price limit - "${parameters.priceLimit}".`);
                }
                let flats = this.database;
                if (parameters.priceLimit != null) {
                    flats = flats.filter((flat) => {
                        return flat.price <= parameters.priceLimit;
                    });
                }
                const dateRange = this._generateDateRange(parameters.checkInDate, parameters.checkOutDate);
                flats = flats.filter((flat) => {
                    return this._areAllDatesAvailable(flat, dateRange);
                });
                flats = flats.map((flat) => {
                    return this._formatFlatObject(flat, dateRange.length - 1);
                });
                resolve(flats);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     * Book flat.
     *
     * @param {number} flatId
     * @param {Date} checkInDate
     * @param {Date} checkOutDate
     * @returns {number}
     */
    book(flatId, checkInDate, checkOutDate) {
        return new Promise((resolve, reject) => {
            try {
                const flat = this.database.find((item) => {
                    return item.id === flatId;
                });
                if (flat == null) {
                    throw new Error('There is no flat with ID "' + flatId + '".');
                }
                this._assertDatesAreCorrect(checkInDate, checkOutDate);
                const datesToBook = this._generateDateRange(checkInDate, checkOutDate);
                if (!this._areAllDatesAvailable(flat, datesToBook)) {
                    throw new Error(`Flat ${flat.id} is not available for dates ${datesToBook.join(",")}.`);
                }
                const bookedDates = datesToBook.map((date) => {
                    return date.getTime();
                });
                flat.bookedDates.push(...bookedDates);
                for (let i = 0; i < this.database.length; i++) {
                    if (this.database[i].id === flat.id) {
                        this.database[i] = flat;
                        break;
                    }
                }
                this._writeDatabase(this.database);
                resolve(this._generateTransactionId());
            }
            catch (error) {
                reject(error);
            }
        });
    }
    _assertDatesAreCorrect(checkInDate, checkOutDate) {
        const today = new Date();
        this._resetTime(today);
        this._resetTime(checkInDate);
        this._resetTime(checkOutDate);
        const diffToday = this._calculateDifferenceInDays(today, checkInDate);
        if (diffToday < 0) {
            throw new Error('Check-in date can\'t be in the past.');
        }
        const diffCheck = this._calculateDifferenceInDays(checkInDate, checkOutDate);
        if (diffCheck < 0) {
            throw new Error('Check-out date must be grater then check-in date.');
        }
    }
    _resetTime(date) {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
    }
    _calculateDifferenceInDays(startDate, endDate) {
        const difference = endDate.getTime() - startDate.getTime();
        return Math.floor(difference / (1000 * 60 * 60 * 24));
    }
    _generateDateRange(from, to) {
        const dates = [];
        const differenceInDays = this._calculateDifferenceInDays(from, to);
        dates.push(new Date(from.getFullYear(), from.getMonth(), from.getDate()));
        for (let i = 1; i <= differenceInDays; i++) {
            dates.push(new Date(from.getFullYear(), from.getMonth(), from.getDate() + i));
        }
        return dates;
    }
    _areAllDatesAvailable(flat, dateRange) {
        return dateRange.every((date) => {
            return !flat.bookedDates.includes(date.getTime());
        });
    }
    _formatFlatObject(flat, nightNumber) {
        const formattedFlat = Object.assign({}, flat);
        formattedFlat.photos = formattedFlat.photos.map((photoUrl) => {
            return `http://localhost:${backendPort}/img/${photoUrl}`;
        });
        if (nightNumber != null) {
            formattedFlat.totalPrice = nightNumber * formattedFlat.price;
            delete formattedFlat.price;
        }
        return formattedFlat;
    }
    _readDatabase() {
        const data = window.localStorage.getItem(localStorageKey);
        if (data == null) {
            return data;
        }
        return JSON.parse(data);
    }
    _writeDatabase(database) {
        window.localStorage.setItem(localStorageKey, JSON.stringify(database));
    }
    _syncDatabase(database) {
        this._writeDatabase(database);
        this.database = this._readDatabase();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdC1yZW50LXNkay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mbGF0LXJlbnQtc2RrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE1BQU0sUUFBUSxHQUFHO0lBQ2I7UUFDSSxFQUFFLEVBQUUsUUFBUTtRQUNaLEtBQUssRUFBRSxzQkFBc0I7UUFDN0IsT0FBTyxFQUFFLGdKQUFnSjtRQUN6SixNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO1FBQ3BDLFdBQVcsRUFBRSxDQUFDLFVBQVUsRUFBQyxVQUFVLENBQUM7UUFDcEMsV0FBVyxFQUFFLEVBQUU7UUFDZixLQUFLLEVBQUUsS0FBSztLQUNmO0lBQ0Q7UUFDSSxFQUFFLEVBQUUsT0FBTztRQUNYLEtBQUssRUFBRSxtQkFBbUI7UUFDMUIsT0FBTyxFQUFFLDZIQUE2SDtRQUN0SSxNQUFNLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO1FBQ2xDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBQyxVQUFVLENBQUM7UUFDbkMsV0FBVyxFQUFFLEVBQUU7UUFDZixLQUFLLEVBQUUsSUFBSTtLQUNkO0lBQ0Q7UUFDSSxFQUFFLEVBQUUsUUFBUTtRQUNaLEtBQUssRUFBRSwyQkFBMkI7UUFDbEMsT0FBTyxFQUFFLDJJQUEySTtRQUNwSixNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO1FBQ3BDLFdBQVcsRUFBRSxDQUFDLFVBQVUsRUFBQyxVQUFVLENBQUM7UUFDcEMsV0FBVyxFQUFFLEVBQUU7UUFDZixLQUFLLEVBQUUsSUFBSTtLQUNkO0lBQ0Q7UUFDSSxFQUFFLEVBQUUsUUFBUTtRQUNaLEtBQUssRUFBRSx5QkFBeUI7UUFDaEMsT0FBTyxFQUFFLDBGQUEwRjtRQUNuRyxNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO1FBQ3BDLFdBQVcsRUFBRSxDQUFDLFVBQVUsRUFBQyxTQUFTLENBQUM7UUFDbkMsV0FBVyxFQUFF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QU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRTdDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN6RCxPQUFPLG9CQUFvQixXQUFXLFFBQVEsUUFBUSxFQUFFLENBQUE7UUFDNUQsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7WUFDckIsYUFBYSxDQUFDLFVBQVUsR0FBRyxXQUFXLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQTtZQUM1RCxPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUE7U0FDN0I7UUFFRCxPQUFPLGFBQWEsQ0FBQTtJQUN4QixDQUFDO0lBRUQsYUFBYTtRQUNULE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBRXpELElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFBO1NBQ2Q7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUVELGNBQWMsQ0FBQyxRQUFRO1FBQ25CLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFDMUUsQ0FBQztJQUVELGFBQWEsQ0FBQyxRQUFRO1FBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDeEMsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCBkYXRhYmFzZSA9IFtcbiAgICB7XG4gICAgICAgIGlkOiAndm5kMzMxJyxcbiAgICAgICAgdGl0bGU6ICdSYWRpc3NvbiBSb3lhbCBIb3RlbCcsXG4gICAgICAgIGRldGFpbHM6ICfQntGC0LXQu9GMINGA0LDRgdC/0L7Qu9C+0LbQtdC9INCyIDQg0LzQuNC90YPRgtCw0YUg0YXQvtC00YzQsdGLINC+0YIg0YHRgtCw0L3RhtC40Lgg0LzQtdGC0YDQviDCq9Cc0LDRj9C60L7QstGB0LrQsNGPwrsuINCaINGD0YHQu9GD0LPQsNC8INCz0L7RgdGC0LXQuSDRhNC40YLQvdC10YEt0YbQtdC90YLRgCDQuCDRgdC/0LAt0YbQtdC90YLRgCDRgSDRgdCw0YPQvdC+0Lkg0Lgg0LPQuNC00YDQvtC80LDRgdGB0LDQttC90L7QuSDQstCw0L3QvdC+0LkuJyxcbiAgICAgICAgcGhvdG9zOiBbJ3ZuZDMzMS5wbmcnLCAndm5kMzMxLnBuZyddLFxuICAgICAgICBjb29yZGluYXRlczogWzU5LjkzMjI5MzYsMzAuMzQ2MDEyOV0sXG4gICAgICAgIGJvb2tlZERhdGVzOiBbXSxcbiAgICAgICAgcHJpY2U6IDEyMDAwXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAnYWIyZTInLFxuICAgICAgICB0aXRsZTogJ9Cd0L7QvNC10YDQsCDQvdCwINCh0LDQtNC+0LLQvtC5JyxcbiAgICAgICAgZGV0YWlsczogJ9Cg0LDRgdC/0L7Qu9C+0LbQtdC9INCyIDcg0LzQuNC90YPRgtCw0YUg0YXQvtC00YzQsdGLINC+0YIg0J3QtdCy0YHQutC+0LPQviDQv9GA0L7RgdC/0LXQutGC0LAuINCaINGD0YHQu9GD0LPQsNC8INCz0L7RgdGC0LXQuSDQutGA0YPQs9C70L7RgdGD0YLQvtGH0L3QsNGPINGB0YLQvtC50LrQsCDRgNC10LPQuNGB0YLRgNCw0YbQuNC4INC4INCx0LXRgdC/0LvQsNGC0L3Ri9C5IFdpLUZpLicsXG4gICAgICAgIHBob3RvczogWydhYjJlMi5wbmcnLCAnYWIyZTIucG5nJ10sXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbNTkuOTMwMzI1LDMwLjMyOTE1OTJdLFxuICAgICAgICBib29rZWREYXRlczogW10sXG4gICAgICAgIHByaWNlOiA0NTAwXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAnbXZtMzJsJyxcbiAgICAgICAgdGl0bGU6ICfQnNC40L3QuCDQntGC0LXQu9GMINC90LAg0J3QtdCy0YHQutC+0LwgMTM2JyxcbiAgICAgICAgZGV0YWlsczogJ9Cc0LjQvdC4LdC+0YLQtdC70Ywg0YDQsNGB0L/QvtC70L7QttC10L0g0LIg0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LPQtSwg0LIgNSDQvNC40L3Rg9GC0LDRhSDRhdC+0LTRjNCx0Ysg0L7RgiDRgdGC0LDQvdGG0LjQuCDQvNC10YLRgNC+IMKr0J/Qu9C+0YnQsNC00Ywg0JLQvtGB0YHRgtCw0L3QuNGPwrsg0Lgg0JzQvtGB0LrQvtCy0YHQutC+0LPQviDQttC10LvQtdC30L3QvtC00L7RgNC+0LbQvdC+0LPQviDQstC+0LrQt9Cw0LvQsC4nLFxuICAgICAgICBwaG90b3M6IFsnbXZtMzJsLnBuZycsICdtdm0zMmwucG5nJ10sXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbNTkuOTI5OTYwMywzMC4zNjU4OTMyXSxcbiAgICAgICAgYm9va2VkRGF0ZXM6IFtdLFxuICAgICAgICBwcmljZTogMzgwMFxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ2J2ZXAxMicsXG4gICAgICAgIHRpdGxlOiAn0J7RgtC10LvRjCDQo9GB0LDQtNGM0LHQsCDQlNC10YDQttCw0LLQuNC90LAnLFxuICAgICAgICBkZXRhaWxzOiAn0J/RgNC10LrRgNCw0YHQvdGL0Lkg0L7RgtC10LvRjCDQvdC10LTQsNC70LXQutC+INC+0YIg0JjRgdCw0LDQutC40LXQstGB0LrQvtCz0L4g0YHQvtCx0L7RgNCwINGBINCx0LXRgdC/0LvQsNGC0L3Ri9C8IFdpLUZpINC90LAg0LLRgdC10Lkg0YLQtdGA0YDQuNGC0L7RgNC40LguJyxcbiAgICAgICAgcGhvdG9zOiBbJ2J2ZXAxMi5wbmcnLCAnYnZlcDEyLnBuZyddLFxuICAgICAgICBjb29yZGluYXRlczogWzU5LjkxOTQ5NjYsMzAuMzA5Mzg5XSxcbiAgICAgICAgYm9va2VkRGF0ZXM6IFtdLFxuICAgICAgICBwcmljZTogODcwMFxuICAgIH1cbl1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lRGF0ZShkYXRlKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRGF5cyhkYXRlLCBkYXlzKSB7XG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgZGF5cylcbiAgICByZXR1cm4gZGF0ZVxufVxuXG5leHBvcnQgY29uc3QgYmFja2VuZFBvcnQgPSAzMDQwXG5leHBvcnQgY29uc3QgbG9jYWxTdG9yYWdlS2V5ID0gJ2ZsYXQtcmVudC1kYidcblxuZXhwb3J0IGNsYXNzIEZsYXRSZW50U2RrIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlYWREYXRhYmFzZSgpID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3dyaXRlRGF0YWJhc2UoZGF0YWJhc2UpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGFiYXNlID0gdGhpcy5fcmVhZERhdGFiYXNlKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgZmxhdCBieSBJRC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgRmxhdCBJRC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3R8bnVsbD59IEZsYXQuXG4gICAgICovXG4gICAgZ2V0KGlkKSB7XG4gICAgICAgIGNvbnN0IGZsYXQgPSB0aGlzLmRhdGFiYXNlLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmlkID09PSBpZFxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmxhdCA9PSBudWxsID8gZmxhdCA6IHRoaXMuX2Zvcm1hdEZsYXRPYmplY3QoZmxhdCkpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VhcmNoIGZvciBmbGF0cy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycyBTZWFyY2ggcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfXBhcmFtZXRlcnMuY2l0eSBDaXR5IG5hbWVcbiAgICAgKiBAcGFyYW0ge0RhdGV9IHBhcmFtZXRlcnMuY2hlY2tJbkRhdGUgQ2hlY2staW4gZGF0ZVxuICAgICAqIEBwYXJhbSB7RGF0ZX0gcGFyYW1ldGVycy5jaGVja091dERhdGUgQ2hlY2stb3V0IGRhdGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtZXRlcnMucHJpY2VMaW1pdF0gTWF4IHByaWNlIGZvciBhIG5pZ2h0XG4gICAgICogQHJldHVybnMge09iamVjdFtdfSBMaXN0IG9mIHN1aXRhYmxlIGZsYXRzLlxuICAgICAqL1xuICAgIHNlYXJjaChwYXJhbWV0ZXJzKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLmNpdHkgIT0gJ9Ch0LDQvdC60YIt0J/QtdGC0LXRgNCx0YPRgNCzJykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhc3NlZCB1bnN1cHBvcnRlZCBjaXR5IC0gXCIke3BhcmFtZXRlcnMuY2l0eX1cIi5gKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghKHBhcmFtZXRlcnMuY2hlY2tJbkRhdGUgaW5zdGFuY2VvZiBEYXRlKSB8fCAhKHBhcmFtZXRlcnMuY2hlY2tPdXREYXRlIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXNzZWQgaW52YWxpZCBjaGVjay1pbiBvciBjaGVjay1vdXQgZGF0ZSAtIGZyb20gXCIke3BhcmFtZXRlcnMuY2hlY2tJbkRhdGV9XCIgdG8gXCIke3BhcmFtZXRlcnMuY2hlY2tPdXREYXRlfVwiLmApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2Fzc2VydERhdGVzQXJlQ29ycmVjdChwYXJhbWV0ZXJzLmNoZWNrSW5EYXRlLCBwYXJhbWV0ZXJzLmNoZWNrT3V0RGF0ZSlcblxuICAgICAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLnByaWNlTGltaXQgIT0gbnVsbCAmJiAoaXNOYU4ocGFyYW1ldGVycy5wcmljZUxpbWl0KSB8fCAhaXNGaW5pdGUocGFyYW1ldGVycy5wcmljZUxpbWl0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXNzZWQgaW52YWxpZCBwcmljZSBsaW1pdCAtIFwiJHtwYXJhbWV0ZXJzLnByaWNlTGltaXR9XCIuYClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBmbGF0cyA9IHRoaXMuZGF0YWJhc2VcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMucHJpY2VMaW1pdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGZsYXRzID0gZmxhdHMuZmlsdGVyKChmbGF0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmxhdC5wcmljZSA8PSBwYXJhbWV0ZXJzLnByaWNlTGltaXRcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVSYW5nZSA9IHRoaXMuX2dlbmVyYXRlRGF0ZVJhbmdlKHBhcmFtZXRlcnMuY2hlY2tJbkRhdGUsIHBhcmFtZXRlcnMuY2hlY2tPdXREYXRlKVxuICAgICAgICAgICAgICAgIGZsYXRzID0gZmxhdHMuZmlsdGVyKChmbGF0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcmVBbGxEYXRlc0F2YWlsYWJsZShmbGF0LCBkYXRlUmFuZ2UpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZmxhdHMgPSBmbGF0cy5tYXAoKGZsYXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0RmxhdE9iamVjdChmbGF0LCBkYXRlUmFuZ2UubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmbGF0cylcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJvb2sgZmxhdC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxhdElkIFxuICAgICAqIEBwYXJhbSB7RGF0ZX0gY2hlY2tJbkRhdGUgXG4gICAgICogQHBhcmFtIHtEYXRlfSBjaGVja091dERhdGVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGJvb2soZmxhdElkLCBjaGVja0luRGF0ZSwgY2hlY2tPdXREYXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZsYXQgPSB0aGlzLmRhdGFiYXNlLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IGZsYXRJZFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChmbGF0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBubyBmbGF0IHdpdGggSUQgXCInICsgZmxhdElkICsgJ1wiLicpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2Fzc2VydERhdGVzQXJlQ29ycmVjdChjaGVja0luRGF0ZSwgY2hlY2tPdXREYXRlKVxuICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlc1RvQm9vayA9IHRoaXMuX2dlbmVyYXRlRGF0ZVJhbmdlKGNoZWNrSW5EYXRlLCBjaGVja091dERhdGUpXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hcmVBbGxEYXRlc0F2YWlsYWJsZShmbGF0LCBkYXRlc1RvQm9vaykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGbGF0ICR7ZmxhdC5pZH0gaXMgbm90IGF2YWlsYWJsZSBmb3IgZGF0ZXMgJHtkYXRlc1RvQm9vay5qb2luKFwiLFwiKX0uYClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGJvb2tlZERhdGVzID0gZGF0ZXNUb0Jvb2subWFwKChkYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmdldFRpbWUoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZmxhdC5ib29rZWREYXRlcy5wdXNoKC4uLmJvb2tlZERhdGVzKVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhYmFzZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhYmFzZVtpXS5pZCA9PT0gZmxhdC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZVtpXSA9IGZsYXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fd3JpdGVEYXRhYmFzZSh0aGlzLmRhdGFiYXNlKVxuICAgICAgICBcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuX2dlbmVyYXRlVHJhbnNhY3Rpb25JZCgpKVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgX2Fzc2VydERhdGVzQXJlQ29ycmVjdChjaGVja0luRGF0ZSwgY2hlY2tPdXREYXRlKSB7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKVxuICAgICAgICB0aGlzLl9yZXNldFRpbWUodG9kYXkpXG4gICAgICAgIHRoaXMuX3Jlc2V0VGltZShjaGVja0luRGF0ZSlcbiAgICAgICAgdGhpcy5fcmVzZXRUaW1lKGNoZWNrT3V0RGF0ZSlcblxuICAgICAgICBjb25zdCBkaWZmVG9kYXkgPSB0aGlzLl9jYWxjdWxhdGVEaWZmZXJlbmNlSW5EYXlzKHRvZGF5LCBjaGVja0luRGF0ZSlcbiAgICAgICAgaWYgKGRpZmZUb2RheSA8IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2staW4gZGF0ZSBjYW5cXCd0IGJlIGluIHRoZSBwYXN0LicpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkaWZmQ2hlY2sgPSB0aGlzLl9jYWxjdWxhdGVEaWZmZXJlbmNlSW5EYXlzKGNoZWNrSW5EYXRlLCBjaGVja091dERhdGUpXG4gICAgICAgIGlmIChkaWZmQ2hlY2sgPCAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrLW91dCBkYXRlIG11c3QgYmUgZ3JhdGVyIHRoZW4gY2hlY2staW4gZGF0ZS4nKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3Jlc2V0VGltZShkYXRlKSB7XG4gICAgICAgIGRhdGUuc2V0SG91cnMoMClcbiAgICAgICAgZGF0ZS5zZXRNaW51dGVzKDApXG4gICAgICAgIGRhdGUuc2V0U2Vjb25kcygwKVxuICAgICAgICBkYXRlLnNldE1pbGxpc2Vjb25kcygwKVxuICAgIH1cblxuICAgIF9jYWxjdWxhdGVEaWZmZXJlbmNlSW5EYXlzKHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICAgICAgICBjb25zdCBkaWZmZXJlbmNlID0gZW5kRGF0ZS5nZXRUaW1lKCkgLSBzdGFydERhdGUuZ2V0VGltZSgpXG5cbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoZGlmZmVyZW5jZSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSlcbiAgICB9XG5cbiAgICBfZ2VuZXJhdGVEYXRlUmFuZ2UoZnJvbSwgdG8pIHtcbiAgICAgICAgY29uc3QgZGF0ZXMgPSBbXVxuICAgICAgICBjb25zdCBkaWZmZXJlbmNlSW5EYXlzID0gdGhpcy5fY2FsY3VsYXRlRGlmZmVyZW5jZUluRGF5cyhmcm9tLCB0bylcbiAgICAgICAgXG4gICAgICAgIGRhdGVzLnB1c2gobmV3IERhdGUoZnJvbS5nZXRGdWxsWWVhcigpLCBmcm9tLmdldE1vbnRoKCksIGZyb20uZ2V0RGF0ZSgpKSlcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gZGlmZmVyZW5jZUluRGF5czsgaSsrKSB7XG4gICAgICAgICAgZGF0ZXMucHVzaChuZXcgRGF0ZShmcm9tLmdldEZ1bGxZZWFyKCksIGZyb20uZ2V0TW9udGgoKSwgZnJvbS5nZXREYXRlKCkgKyBpKSlcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4gZGF0ZXNcbiAgICB9XG5cbiAgICBfZ2VuZXJhdGVUcmFuc2FjdGlvbklkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBtaW4gPSAxMDAwXG4gICAgICAgIGNvbnN0IG1heCA9IDk5OTlcbiAgICAgICAgY29uc3QgbnVtID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluXG4gICAgXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG51bSlcbiAgICB9XG5cbiAgICBfYXJlQWxsRGF0ZXNBdmFpbGFibGUoZmxhdCwgZGF0ZVJhbmdlKSB7XG4gICAgICAgIHJldHVybiBkYXRlUmFuZ2UuZXZlcnkoKGRhdGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhZmxhdC5ib29rZWREYXRlcy5pbmNsdWRlcyhkYXRlLmdldFRpbWUoKSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBfZm9ybWF0RmxhdE9iamVjdChmbGF0LCBuaWdodE51bWJlcikge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRGbGF0ID0gT2JqZWN0LmFzc2lnbih7fSwgZmxhdClcblxuICAgICAgICBmb3JtYXR0ZWRGbGF0LnBob3RvcyA9IGZvcm1hdHRlZEZsYXQucGhvdG9zLm1hcCgocGhvdG9VcmwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgaHR0cDovL2xvY2FsaG9zdDoke2JhY2tlbmRQb3J0fS9pbWcvJHtwaG90b1VybH1gXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKG5pZ2h0TnVtYmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZEZsYXQudG90YWxQcmljZSA9IG5pZ2h0TnVtYmVyICogZm9ybWF0dGVkRmxhdC5wcmljZVxuICAgICAgICAgICAgZGVsZXRlIGZvcm1hdHRlZEZsYXQucHJpY2VcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRGbGF0XG4gICAgfVxuXG4gICAgX3JlYWREYXRhYmFzZSgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbFN0b3JhZ2VLZXkpXG5cbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpXG4gICAgfVxuXG4gICAgX3dyaXRlRGF0YWJhc2UoZGF0YWJhc2UpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsU3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YWJhc2UpKVxuICAgIH1cblxuICAgIF9zeW5jRGF0YWJhc2UoZGF0YWJhc2UpIHtcbiAgICAgICAgdGhpcy5fd3JpdGVEYXRhYmFzZShkYXRhYmFzZSlcbiAgICAgICAgdGhpcy5kYXRhYmFzZSA9IHRoaXMuX3JlYWREYXRhYmFzZSgpXG4gICAgfVxufVxuIl19