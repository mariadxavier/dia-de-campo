import { syncCeasaPrices } from "@/src/server/services/syncCeasaPrices";
import { ErrorHandler } from "@/src/util/ErrorHandler";

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
  ErrorHandler.handle(error, 'CEASA SYNC')

  process.exit(1);
});