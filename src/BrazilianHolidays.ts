import moment from 'moment';

export default class BrazilianHolidays {
  constructor(
    private fromYear: number,
    toYear?: number,
  ) {
    this.toYear = toYear || this.fromYear;
    this.dateFormat = 'YYYY-MM-DD';
  }

  public getAll(): string[] {
    const holidays: string[] = [];

    // setup fixed holidays
    for (let year = this.fromYear; year <= this.toYear; year += 1) {
      for (let i = 0; i < this.fixedHolidays.length; i += 1) {
        holidays.push(`${year}-${this.fixedHolidays[i]}`);
      }
    }

    // setup moving holidays
    for (let year = this.fromYear; year <= this.toYear; year += 1) {
      const easter = this.getEaster(year);

      const segundaFeiraDeCarnaval = moment(easter, this.dateFormat)
        .subtract(48, 'days')
        .format(this.dateFormat);

      const tercaFeiraDeCarnaval = moment(easter, this.dateFormat)
        .subtract(47, 'days')
        .format(this.dateFormat);

      const paixaoDeCristo = moment(easter, this.dateFormat)
        .subtract(2, 'days')
        .format(this.dateFormat);

      const corpusChristi = moment(easter, this.dateFormat)
        .add(60, 'days')
        .format(this.dateFormat);

      holidays.push(segundaFeiraDeCarnaval);
      holidays.push(tercaFeiraDeCarnaval);
      holidays.push(paixaoDeCristo);
      holidays.push(corpusChristi);
    }

    return holidays;
  }

  getEaster(year: number): string {
    let x = 24;
    let y = 5;

    if (year >= 1582 && year <= 1699) {
      x = 22;
      y = 2;
    }

    if (year >= 1700 && year <= 1799) {
      x = 23;
      y = 3;
    }

    if (year >= 1800 && year <= 1899) {
      x = 24;
      y = 4;
    }

    if (year >= 1900 && year <= 2099) {
      x = 24;
      y = 5;
    }

    if (year >= 2100 && year <= 2200) {
      x = 24;
      y = 6;
    }

    if (year >= 2200 && year <= 2299) {
      x = 25;
      y = 7;
    }

    const a = year % 19;
    const b = year % 4;
    const c = year % 7;
    const d = (19 * a + x) % 30;
    const e = (2 * b + 4 * c + 6 * d + y) % 7;

    let easter = '';

    if (d + e > 9) {
      easter = `04-${d + e - 9}`;
    } else {
      easter = `03-${d + e + 22}`;
    }

    if (easter === '04-26') {
      easter = '04-19';
    }

    if (easter === '04-25' && d === 28 && a > 10) {
      easter = '04-18';
    }

    return `${year}-${easter}`;
  }

  // FIXED HOLIDAYS
  private confraternizacaoUniversal = '01-01';

  private tiradentes = '04-21';

  private diaDoTrabalho = '05-01';

  private independencia = '09-07';

  private nossaSenhora = '10-12';

  private finados = '11-02';

  private proclamacaoDaRepublica = '11-15';

  private vesperaDeNatal = '12-24';

  private natal = '12-25';

  private reveillon = '12-31';

  private fixedHolidays = [
    this.confraternizacaoUniversal,
    this.tiradentes,
    this.diaDoTrabalho,
    this.independencia,
    this.nossaSenhora,
    this.finados,
    this.proclamacaoDaRepublica,
    this.vesperaDeNatal,
    this.natal,
    this.reveillon,
  ];

  private toYear: number;

  private dateFormat: string;
}
