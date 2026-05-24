import { syncCeasaPrices } from "@/src/server/services/syncCeasaPrices";

async function bootstrap() {
  console.log(
    "[CEASA] Starting sync...",
  );

  await syncCeasaPrices();

  console.log(
    "[CEASA] Sync finished.",
  );

  process.exit(0);
}

bootstrap().catch((error) => {
  console.error(error);

  process.exit(1);
});