# Market Scheduler Brazil
## A [moment-business-days](https://www.npmjs.com/package/moment-business-days) wrapper concerning Operations in Brazil


## Default Configuration
* Date formart: **YYYY-MM-DD**

* Datetime formart: **YYYY-MM-DD HH:mm:ss**

* Market Closing time 20:00 UTC+0

## Brazilian Holidays Reference
Only National Holidays are considered and there are considered from 2020 to 2024 only.
Please mind that futher patchs should handle other situations.
* [National Holidays in 2020](anbima.com.br/feriados/fer_nacionais/2020.asp)
* [National Holidays in 2021](anbima.com.br/feriados/fer_nacionais/2021.asp)
* [National Holidays in 2022](anbima.com.br/feriados/fer_nacionais/2022.asp)
* [National Holidays in 2023](anbima.com.br/feriados/fer_nacionais/2023.asp)
* [National Holidays in 2024](anbima.com.br/feriados/fer_nacionais/2024.asp)


## Methods available
  * businessSubtract(date: string, days: number): string

  * businessAdd(date: string, days: number): string 

  * nextBusinessDay(): string
  
  * isMarketOpen(): boolean 
  
  * today(): string
  
  * now(): string

  * holidays(): string[]

  * isMarketOpenOnDate(date: string): boolean 

  * getMarketOpeningDatetime(date: string): string
  
  * getMarketClosingDatetime(date: string): string


## VS Code Launch JSON

```
  {
    "version": "0.2.0",
    "configurations": [
      {
        "type": "node",
        "request": "launch",
        "name": "Jest Current File",
        "program": "${workspaceFolder}/node_modules/.bin/jest",
        "console": "integratedTerminal",
        "internalConsoleOptions": "neverOpen"
      },
    ]
  }
```