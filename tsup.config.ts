import { defineConfig, Options } from "tsup";

const configOptions = (options: Options): Options => {
  return {
    dts: true,
    minify: true,
    format: ["cjs", "esm"],
    outDir: "dist",
    target: "esnext",
    clean: !options.watch,
    ...options
  };
};

export default defineConfig((options) => [
  configOptions({
    ...options,
    outDir: "dist/extra",
    entry: [
      "src/extra/*.ts",
      "src/extra/*.tsx",
      "!src/extra/tests/*",
      "!src/extra/tests/*"
    ]
  })
]);
