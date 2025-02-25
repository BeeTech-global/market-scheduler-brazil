import MockDate from 'mockdate';
import MarketScheduler from '../../src/MarketScheduler';

let marketScheduler: MarketScheduler;

const lastFriday = '2020-01-03';
const sunday = '2020-01-05';
const monday = '2020-01-06';
const tuesday = '2020-01-07';
const wednesday = '2020-01-08';
const thursday = '2020-01-09';
const friday = '2020-01-10';
const saturday = '2020-01-11';
const nextMonday = '2020-01-13';
const holiday = '2020-01-01';

describe('MarketScheduler', () => {
  beforeEach(() => {
    marketScheduler = new MarketScheduler('12:00', '20:00', 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss', [holiday]);
  });

  describe('.isMarketOpenOnDate', () => {
    it('Should return false given a Sunday', () => {
      expect(marketScheduler.isMarketOpenOnDate(sunday)).toBe(false);
    });

    it('Should return true given a Monday', () => {
      expect(marketScheduler.isMarketOpenOnDate(monday)).toBe(true);
    });

    it('Should return true given a Tuesday', () => {
      expect(marketScheduler.isMarketOpenOnDate(tuesday)).toBe(true);
    });

    it('Should return true given a Wednesday', () => {
      expect(marketScheduler.isMarketOpenOnDate(wednesday)).toBe(true);
    });

    it('Should return true given a Thursday', () => {
      expect(marketScheduler.isMarketOpenOnDate(thursday)).toBe(true);
    });

    it('Should return true given a Friday', () => {
      expect(marketScheduler.isMarketOpenOnDate(friday)).toBe(true);
    });

    it('Should return false given a Saturday', () => {
      expect(marketScheduler.isMarketOpenOnDate(saturday)).toBe(false);
    });

    it('Should return false given a holiday', () => {
      expect(marketScheduler.isMarketOpenOnDate(holiday)).toBe(false);
    });
  });

  describe('.businessAdd', () => {
    it('Should return Monday given Saturday', () => {
      expect(marketScheduler.businessAdd(saturday, 1)).toBe(nextMonday);
    });

    it('Should return Tuesday given Monday', () => {
      expect(marketScheduler.businessAdd(monday, 1)).toBe(tuesday);
    });

    it('Should return Friday given Monday +4', () => {
      expect(marketScheduler.businessAdd(monday, 4)).toBe(friday);
    });
  });

  describe('.businessSubtract', () => {
    it('Should return Friday given Sunday', () => {
      expect(marketScheduler.businessSubtract(sunday, 1)).toBe(lastFriday);
    });

    it('Should return Monday given Tuesday', () => {
      expect(marketScheduler.businessSubtract(tuesday, 1)).toBe(monday);
    });
  });

  describe('.getMarketOpeningDatetime', () => {
    it('Should return market opening time given a business day', () => {
      expect(marketScheduler.getMarketOpeningDatetime(tuesday)).toBe(`${tuesday} 12:00:00`);
    });
  });

  describe('.getMarketClosingDatetime', () => {
    it('Should return market closing time given a business day', () => {
      expect(marketScheduler.getMarketClosingDatetime(tuesday)).toBe(`${tuesday} 20:00:00`);
    });
  });

  describe('.nextBusinessDay', () => {
    it('Should return Monday given Saturday', () => {
      MockDate.set(saturday);
      expect(marketScheduler.nextBusinessDay()).toBe(nextMonday);
      MockDate.reset();
    });

    it('Should return Tuesday given Monday', () => {
      MockDate.set(`${monday} 12:00:00`);
      expect(marketScheduler.nextBusinessDay()).toBe(tuesday);
      MockDate.reset();
    });
  });

  describe('.isBusinessDay', () => {
    it('Should return false on Saturday', () => {
      MockDate.set(saturday);
      expect(marketScheduler.isBusinessDay()).toBe(false);
      MockDate.reset();
    });

    it('Should return true on Monday', () => {
      MockDate.set(monday);
      expect(marketScheduler.isBusinessDay()).toBe(true);
      MockDate.reset();
    });
  });

  describe('.isMarketOpen', () => {
    it('Quarta Feira de Cinzas - Antes de 13h', () => {
      const feriadoParcialQuartaFeiraDeCinzas = '2025-03-05 12:59:59 UTC-3';
      MockDate.set(feriadoParcialQuartaFeiraDeCinzas);
      expect(marketScheduler.isMarketOpen()).toBe(false);
      MockDate.reset();
    });

    it('Quarta Feira de Cinzas - Apos 13h', () => {
      const feriadoParcialQuartaFeiraDeCinzas = '2025-03-05 13:00:01 UTC-3';
      MockDate.set(feriadoParcialQuartaFeiraDeCinzas);
      expect(marketScheduler.isMarketOpen()).toBe(true);
      MockDate.reset();
    });

    it('Should return false on Saturday', () => {
      MockDate.set(saturday);
      expect(marketScheduler.isMarketOpen()).toBe(false);
      MockDate.reset();
    });

    it('Should return true on Monday right before market closes', () => {
      MockDate.set(`${monday} 16:59:59 UTC-3`);
      expect(marketScheduler.isMarketOpen()).toBe(true);
      MockDate.reset();
    });

    it('Should return false on Monday just after market closes', () => {
      MockDate.set(`${monday} 17:00:01 UTC-3`);
      expect(marketScheduler.isMarketOpen()).toBe(false);
      MockDate.reset();
    });

    it('Should return true on Monday just after market opens', () => {
      MockDate.set(`${monday} 09:00:01 UTC-3`);
      expect(marketScheduler.isMarketOpen()).toBe(true);
      MockDate.reset();
    });

    it('Should return false on Monday just before market opens', () => {
      MockDate.set(`${monday} 08:59:00 UTC-3`);
      expect(marketScheduler.isMarketOpen()).toBe(false);
      MockDate.reset();
    });
  });

  describe('.isBeforeOpen', () => {
    it('return true on mondays 8Am', () => {
      MockDate.set(`${monday} 8:59:59 UTC-3`);
      expect(marketScheduler.isBeforeOpen()).toBe(true);
      MockDate.reset();
    });

    it('return false on mondays 10AM', () => {
      MockDate.set(`${monday} 10:00:00 UTC-3`);
      expect(marketScheduler.isBeforeOpen()).toBe(false);
      MockDate.reset();
    });

    it('return false on mondays at 23:30', () => {
      MockDate.set(`${monday} 23:59:59 UTC-3`);
      expect(marketScheduler.isBeforeOpen()).toBe(false);
      MockDate.reset();
    });
  });

  describe('.isAfterClose', () => {
    it('return false on mondays 8Am', () => {
      MockDate.set(`${monday} 8:00:00 UTC-3`);
      expect(marketScheduler.isAfterClose()).toBe(false);
      MockDate.reset();
    });

    it('return false on mondays 10AM', () => {
      MockDate.set(`${monday} 10:00:00 UTC-3`);
      expect(marketScheduler.isAfterClose()).toBe(false);
      MockDate.reset();
    });

    it('return false on mondays at 23:30', () => {
      MockDate.set(`${monday} 23:30:00 UTC-3`);
      expect(marketScheduler.isAfterClose()).toBe(true);
      MockDate.reset();
    });
  });

  describe('.today', () => {
    it('Should return Wednesday on Wednesday', () => {
      MockDate.set(wednesday);
      expect(marketScheduler.today()).toBe(wednesday);
      MockDate.reset();
    });
  });

  describe('.now', () => {
    it('Should return Monday mid-day UTC+0 on Monday mid-day', () => {
      MockDate.set(`${monday} 12:00:00 +00:00`);
      expect(marketScheduler.now()).toBe(`${monday} 12:00:00`);
      MockDate.reset();
    });
  });

  describe('Holidays', () => {
    it('Should return holidays informed on instatiation', () => {
      expect(marketScheduler.holidays).toHaveLength(1);
      expect(marketScheduler.holidays[0]).toBe(holiday);
    });
  });
});
