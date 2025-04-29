import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { config } from "dotenv";

const envPath = path.resolve(process.cwd(), ".env.production");
if (fs.existsSync(envPath)) {
  config({ path: envPath });
} else {
  console.warn(
    "Se esperaba el fichero .env.production, pero no se ha encontrado. No se compilará",
  );
  process.exit(1);
}

const distPath = path.resolve(process.cwd(), "dist");
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
}

console.log("Iniciando compilación para producción...\n");

const build = spawn("npx", ["vite", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NODE_ENV: "production" },
});

build.on("close", (code) => {
  if (code === 0) {
    console.log("\nCompilación completada.");
  } else {
    console.error("\nOcurrió un error durante la compilación.");
    process.exit(1);
  }
});
