import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { config } from "dotenv";

const envPath = path.resolve(process.cwd(), ".env.test");
if (fs.existsSync(envPath)) {
  config({ path: envPath });
} else {
  console.warn(
    "Se esperaba el fichero .env.test, pero no se ha encontrado. No se ejecutarán los tests.",
  );
  process.exit(1);
}

console.log("Iniciando tests...\n");

const test = spawn("npx", ["vitest", "watch"], {
  stdio: "inherit",
  shell: true,
});

test.on("close", (code) => {
  if (code === 0) {
    console.log("\nTests finalizados correctamente.");
  } else {
    console.error("\nOcurrió un error durante la ejecución de los tests.");
    process.exit(1);
  }
});
