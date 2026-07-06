const required = ["NEXT_PUBLIC_SITE_URL", "DATABASE_URL"];

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`Missing env: ${key}`);
  }
}

console.log("Env check complete.");
