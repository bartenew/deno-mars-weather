import { SolWeather } from "./sol-weather.ts";

export class InsightWeatherClient {
  apiKey: string;
  apiUrl: string;

  constructor(apiKey: string, apiUrl: string) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  getWeatherData(): Promise<SolWeather[]> {
    const url = new URL(this.apiUrl);
    url.searchParams.append("api_key", this.apiKey);
    url.searchParams.append("feedtype", "json");
    url.searchParams.append("ver", "1.0");

    return new Promise<SolWeather[]>((resolve, reject) => {
      fetch(url).then((response) => response.json())
        .then((data) => {
          const solWeatherData: SolWeather[] = [];
          for (let solKey of data.sol_keys) {
            const entry = data[solKey];
            solWeatherData.push({
              sol: parseInt(solKey),
              average: entry.AT.av,
              low: entry.AT.mn,
              high: entry.AT.mx,
            });
          }
          resolve(solWeatherData);
        });
    });
  }
}
