import MarketScheduler from './MarketScheduler';
import holidays from './holidays.json';

const marketScheduler = new MarketScheduler('20:00', 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss', holidays);

export default marketScheduler;
