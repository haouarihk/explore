export const defaultConfig = {
    per: 1,
    numberOfTimes: 3,
    errorMessage: "limit exceeded,  try again in {{per}} seconds",
  };
  
  export default class CallsLimiter {
    clients: {
      [token: string]: {
        calls: number;
        lastCallTime: number;
      };
    };
  
    /** in seconds */
    per: number;
    
    /** number of times a client can request in the "per" amount of time */
    numberOfTimes: number;
  
    /** Error message when the limit is exceeded */
    errorMessage: string;
  
    constructor(options?: {
      per: number;
      numberOfTimes: number;
      errorMessage?: string;
    }) {
      const per = options?.per ?? defaultConfig.per;
      this.numberOfTimes = options?.numberOfTimes ?? defaultConfig.numberOfTimes;
      this.errorMessage = options?.errorMessage ?? defaultConfig.errorMessage;
  
      this.clients = {};
      this.per = per;
      this.cleaner();
    }
  
    getErrorMessage() {
      return this.errorMessage
        .replace("{{per}}", this.per.toString())
        .replace("{{numberOfTimes}}", this.numberOfTimes.toString());
    }
  
    async check(token: string) {
      if (!this.clients[token]) {
        this.clients[token] = {
          calls: 0,
          lastCallTime: Date.now(),
        };
      }
  
      if (this.clients[token].calls >= this.numberOfTimes) {
        if (Date.now() - this.clients[token].lastCallTime < this.per * 1000) {
          throw new Error(this.getErrorMessage());
        } else {
          this.clients[token] = {
            calls: 0,
            lastCallTime: Date.now(),
          };
        }
      }
      this.clients[token].calls++;
      return true;
    }
  
    cleaner() {
      setInterval(() => {
        for (const c in this.clients) {
          if (Date.now() - this.clients[c].lastCallTime > this.per * 1000) {
            delete this.clients[c];
          }
        }
      }, this.per * 60 * 1000);
    }
  }
  