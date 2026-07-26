import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const compilerAlias = packageJson.devDependencies?.['@typescript/native'];
const aliasMatch = /^npm:typescript@(\d+\.\d+\.\d+)$/u.exec(compilerAlias ?? '');

if (aliasMatch === null) {
  throw new Error('@typescript/native must be an exact npm alias to TypeScript.');
}

const expectedVersion = aliasMatch[1];
const versionOutput = execFileSync(
  process.execPath,
  ['node_modules/@typescript/native/bin/tsc', '--version'],
  { encoding: 'utf8' },
).trim();
const actualVersion = versionOutput.replace(/^Version\s+/u, '');

if (actualVersion !== expectedVersion) {
  throw new Error(
    `TypeScript compiler mismatch: package.json pins ${expectedVersion}, executable reports ${actualVersion}.`,
  );
}

console.log(`Primary compiler verified: TypeScript ${actualVersion} via @typescript/native.`);
