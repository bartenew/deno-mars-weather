import {Application, Router} from "https://deno.land/x/oak/mod.ts";
import {InsightWeatherClient} from "./insight-client.ts";

const app = new Application();

const insightWeatherClient = new InsightWeatherClient(
    "DEMO_KEY",
    "https://api.nasa.gov/insight_weather/");

const router = new Router();
router.get("/", async ({response}: { response: any }) => {
    response.body = await insightWeatherClient.getWeatherData();
});
app.use(router.routes());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`
  );
});

await app.listen({port: 8000});
