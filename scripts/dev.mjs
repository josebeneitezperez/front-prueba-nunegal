import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { config } from "dotenv";

const envPath = path.resolve(process.cwd(), ".env.development");
if (fs.existsSync(envPath)) {
  config({ path: envPath });
} else {
  console.warn(
    "Se esperaba el fichero .env.development. pero no se ha encontrado",
  );
}

const port = process.env.PORT || "5173";

console.log("Iniciando entorno des...\n");

const vite = spawn("npx", ["vite", "--open", "--port", port], {
  stdio: "inherit",
  shell: true,
});

vite.on("close", (code) => {
  console.log(`\nVite dev server finalizó con código ${code}`);
});
