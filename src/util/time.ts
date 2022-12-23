import moment from 'moment';

export class TimeUtil {
    public static getUnixTImeForAFutureDay(days: number): number {
        return moment().add(days, 'days').unix();
    }
}