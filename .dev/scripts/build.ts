import path from "path";
import fs, { realpath } from "fs";
import { execSync } from "child_process";

const srcFolder = path.join(__dirname, "../../src");


function build(folder: string = srcFolder) {
  const files = fs
    .readdirSync(folder)
    .map((fileName) => path.join(folder, fileName));

  for (const file of files) {
    if (fs.statSync(file).isDirectory()) {
      build(file);
    } else {
      const relativePath = path.relative(srcFolder, file);
      const outputDest = path.join("./dist", relativePath);
      const cmd = `pnpm dlx @tailwindcss/cli --input ${path.join(
        "src",
        relativePath
      )} --output ${outputDest} --minify`;

      execSync(cmd);
    }
  }
}

build();
