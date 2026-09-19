import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // scripts/ — bir martalik Node yordamchi skriptlari (CommonJS), sayt kodi emas
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'scripts/**']
  }
]

export default eslintConfig
