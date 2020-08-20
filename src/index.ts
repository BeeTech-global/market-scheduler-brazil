import MarketScheduler from './MarketScheduler';
import BrazilianHolidays from './BrazilianHolidays';

const brazilianHolidays = new BrazilianHolidays(2020, 2099);

const holidays = brazilianHolidays.getAll();

const marketScheduler = new MarketScheduler('20:00', 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss', holidays);

module.exports = marketScheduler;
