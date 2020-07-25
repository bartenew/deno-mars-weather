import { serve } from "https://deno.land/std@0.62.0/http/server.ts";
import { InsightWeatherClient } from "./insight-client.ts";

const insightWeatherClient = new InsightWeatherClient(
  "DEMO_KEY",
  "https://api.nasa.gov/insight_weather/",
);

const server = serve({ port: 8000 });
for await (const req of server) {
  req.respond(
    { body: JSON.stringify(await insightWeatherClient.getWeatherData()) },
  );
}
