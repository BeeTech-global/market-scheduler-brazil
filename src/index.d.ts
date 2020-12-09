export default marketScheduler;
declare const marketScheduler: MarketScheduler;
export declare class MarketScheduler {
  constructor(cutTimeUtc: string, dateFormat: string, datetimeFormat: string, holidays: string[]);
  public cutTimeUtc: string;
  public dateFormat: string;
  public datetimeFormat: string;
  public set holidays(arg: string[]);
  public get holidays(): string[];
  public businessSubtract(date: string, days: number): string;
  public businessAdd(date: string, days: number): string;
  public nextBusinessDay(): string;
  public isMarketOpen(): boolean;
  public isBusinessDay(): boolean;
  public today(): string;
  public now(): string;
  public isMarketOpenOnDate(date: string): boolean;
  public getMarketOpeningDatetime(date: string): string;
  public getMarketClosingDatetime(date: string): string;
  private currentHolidays;
  private getClosingTime;
}