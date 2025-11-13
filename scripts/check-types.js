#!/usr/bin/env node
const { execSync } = require('child_process');
const { resolve } = require('path');

// Получаем список измененных TypeScript файлов
const getStagedFiles = () => {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACMRTUXB "*.{ts,tsx}"', {
      encoding: 'utf-8',
    });
    return output.split('\n').filter(Boolean);
  } catch (error) {
    console.error('Ошибка при получении списка файлов:', error.message);
    process.exit(1);
  }
};

const stagedFiles = getStagedFiles();

if (stagedFiles.length > 0) {
  console.log('🔍 Проверка типов в измененных файлах...');

  // Собираем полные пути к файлам
  const filesToCheck = stagedFiles.map((file) => `"${resolve(process.cwd(), file)}"`).join(' ');

  try {
    // Проверяем только измененные файлы
    execSync(`npx tsc --noEmit --pretty --skipLibCheck --noErrorTruncation ${filesToCheck}`, {
      stdio: 'inherit',
    });
    console.log('✅ Проверка типов прошла успешно');
  } catch (error) {
    console.error('❌ Обнаружены ошибки типизации');
    process.exit(1);
  }
} else {
  console.log('ℹ️ Нет измененных TypeScript файлов для проверки');
}
