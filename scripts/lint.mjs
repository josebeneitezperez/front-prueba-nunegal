import { exec } from "node:child_process";

console.log("Iniciando lint...\n");

exec("eslint src tests scripts", (err, stdout, stderr) => {
  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);
  if (err) process.exit(err.code);
});
