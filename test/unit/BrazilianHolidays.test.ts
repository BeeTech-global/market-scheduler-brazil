import BrazilianHolidays from '../../src/BrazilianHolidays';
import holidaysSample from './holidays.json';

describe('BrazilianHolidays', () => {
  it('Should have a method called getAll', () => {
    const brazilianHolidays = new BrazilianHolidays(2020);

    expect(brazilianHolidays.getAll).toBeDefined();
  });

  it('Should only return valid dates', () => {
    const brazilianHolidays = new BrazilianHolidays(2020, 2024);
    const holidays = brazilianHolidays.getAll();

    for (const holiday of holidays) {
      expect(holiday).toMatch(/\d{4}-\d{2}-\d{2}/);
    }
  });

  it('Should match all holidays from 2020 to 2024', () => {
    const brazilianHolidays = new BrazilianHolidays(2020, 2024);
    const holidays = brazilianHolidays.getAll();

    for (const holiday of holidaysSample) {
      expect(holidays).toContain(holiday);
    }
  });

  it('Should not consider a non-holiday day such as 10-10 a holiday', () => {
    const brazilianHolidays = new BrazilianHolidays(2022);
    const holidays = brazilianHolidays.getAll();

    expect(holidays).not.toContain('2022-10-10');
  });
});
