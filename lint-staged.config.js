import { execSync } from 'child_process';

export default {
  '*.{ts,tsx}': [
    'eslint --fix --max-warnings=0',
    'prettier --write --ignore-unknown',
    () => {
      execSync('npx tsc --noEmit -p tsconfig.app.json', { stdio: 'inherit' });
      return [];
    },
  ],
  '*.{js,jsx,cjs,mjs}': ['eslint --fix --max-warnings=0', 'prettier --write --ignore-unknown'],
  '*.{css,json,md,html,yml,yaml}': ['prettier --write --ignore-unknown'],
};
