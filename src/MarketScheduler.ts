import { Moment } from 'moment';
import moment from 'moment-business-days';

export default class MarketScheduler {
  // @cutTimeUtc expected to match "HH:mm" format
  constructor(
    public readonly openTimeUtc: string,
    public readonly cutTimeUtc: string,
    public readonly dateFormat: string,
    public readonly datetimeFormat: string,
    holidays: string[],
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

    return (
      now.isBusinessDay()
      && now.isBefore(this.getClosingTime())
      && now.isAfter(this.getOpenTime())
    );
  }

  public isBeforeOpen(): boolean {
    const now = moment().utc();

    return now.isBefore(this.getOpenTime());
  }

  public isAfterClose(): boolean {
    const now = moment().utc();

    return now.isAfter(this.getClosingTime());
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
    return `${moment(date).format(this.dateFormat)} ${this.openTimeUtc}:00`;
  }

  // @date should be a business day
  public getMarketClosingDatetime(date: string): string {
    return `${moment(date).format(this.dateFormat)} ${this.cutTimeUtc}:00`;
  }

  public set holidays(holidays: string[]) {
    moment.updateLocale('us', {
      holidays,
      holidayFormat: this.dateFormat,
    });

    this.currentHolidays = holidays;
  }

  public get holidays(): string[] {
    return this.currentHolidays;
  }

  private currentHolidays: string[] = [];

  private getOpenTime(): Moment {
    const secondsAmount = moment.duration(this.openTimeUtc).asSeconds();

    return moment().utc().subtract(3, 'hours').startOf('day')
      .add(secondsAmount, 'seconds');
  }

  private getClosingTime(): Moment {
    const secondsAmount = moment.duration(this.cutTimeUtc).asSeconds();

    return moment().utc().subtract(3, 'hours').startOf('day')
      .add(secondsAmount, 'seconds');
  }
}
