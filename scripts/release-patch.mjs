import { readFileSync } from "fs";
import { execSync } from "child_process";

// Step 1: Bump patch version without creating git tag/commit
execSync("pnpm version patch --no-git-tag-version", { stdio: "inherit" });

// Step 2: Read new version from package.json
const pkg = JSON.parse(readFileSync("./package.json", "utf8"));
const version = pkg.version;
const tag = `v${version}`;

// Step 3: Generate changelog with exact version
execSync(`pnpm changelog --tag ${tag}`, { stdio: "inherit" });

// Step 4: Commit changes
execSync(`git add package.json CHANGELOG.md`, { stdio: "inherit" });
execSync(`git commit -m "chore(release): ${tag}"`, { stdio: "inherit" });

// Step 5: Create tag and push to remote
execSync(`git tag ${tag}`, { stdio: "inherit" });
execSync("git push", { stdio: "inherit" });
execSync("git push --tags", { stdio: "inherit" });
