import BrazilianHolidays from './BrazilianHolidays';
import MarketScheduler from './MarketScheduler';

const brazilianHolidays = new BrazilianHolidays(2020, 2099);

const holidays = brazilianHolidays.getAll();

const marketScheduler = new MarketScheduler(
  '12:00',
  '20:00',
  'YYYY-MM-DD',
  'YYYY-MM-DD HH:mm:ss',
  holidays,
);

export default marketScheduler;
