const MARKET_API_URL = process.env.MARKET_API_URL || "";

async function main() {
  if (!MARKET_API_URL) {
    console.log("MARKET_API_URL is empty. Add provider URL later.");
    return;
  }

  console.log("Market provider:", MARKET_API_URL);
}

main();
