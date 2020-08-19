# Market Scheduler Brazil
## A [moment-business-days](https://www.npmjs.com/package/moment-business-days) wrapper concerning Operations in Brazil


## Default Configuration
* Date formart: **YYYY-MM-DD**

* Datetime formart: **YYYY-MM-DD HH:mm:ss**

* Market Closing time 20:00 UTC+0

## Available API
  * businessSubtract(date: string, days: number): string

  * businessAdd(date: string, days: number): string 

  * nextBusinessDay(): string
  
  * isMarketOpen(): boolean 
  
  * isBusinessDay(): boolean 
  
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