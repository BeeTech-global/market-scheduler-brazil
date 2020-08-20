import { Moment } from 'moment';
import moment from 'moment-business-days';

export default class MarketScheduler {
  // @cutTimeUtc expected to match "HH:mm" format
  constructor(
    public cutTimeUtc: string,
    public dateFormat: string,
    public datetimeFormat: string,
    holidays: string[]
  ) {
    this.holidays = holidays;
  }

  public businessSubtract(date: string, days: number): string {
    return moment(date).businessSubtract(days).format(this.dateFormat);
  }

  public businessAdd(date: string, days: number): string {
    return moment(date).businessAdd(days).format(this.dateFormat);
  }

  public nextBusinessDay(): string {
    return this.businessAdd(moment().utc().format(), 1);
  }

  public isMarketOpen(): boolean {
    const now = moment().utc();

    return now.isBusinessDay() && now.isBefore(this.getClosingTime());
  }

  public isBusinessDay(): boolean {
    return moment().utc().isBusinessDay();
  }

  public today(): string {
    return moment().utc().format(this.dateFormat);
  }

  public now(): string {
    return moment().utc().format(this.datetimeFormat);
  }

  public isMarketOpenOnDate(date: string): boolean {
    return moment(date).isBusinessDay();
  }

  // @date should be a business day
  public getMarketOpeningDatetime(date: string): string {
    return `${moment(date).businessSubtract(1).format(this.dateFormat)} ${this.cutTimeUtc}:01`;
  }

  // @date should be a business day
  public getMarketClosingDatetime(date: string): string {
    return `${moment(date).format(this.dateFormat)} ${this.cutTimeUtc}:00`;
  }

  public set holidays(holidays: string[]) {
    moment.updateLocale('us', {
      holidays,
      holidayFormat: this.dateFormat
    });

    this.currentHolidays = holidays;
  }

  public get holidays(): string[] {
    return this.currentHolidays;
  }

  private currentHolidays: string[] = [];

  private getClosingTime(): Moment {
    const closingSecondsAmount = moment.duration(this.cutTimeUtc).asSeconds();

    return moment().utc().startOf('day').add(closingSecondsAmount, 'seconds');
  }
}
