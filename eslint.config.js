import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import boundaries from 'eslint-plugin-boundaries'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const layers = {
  'server-config': [],
  'server-domain': [],
  'server-db': ['server-domain'],
  'server-http': ['server-domain', 'server-db'],
  'server-main': ['server-config', 'server-domain', 'server-db', 'server-http'],
  'client-api': [],
  'client-ui-shared': [],
  'client-ui': ['client-ui-shared'],
  'client-features': ['client-ui', 'client-ui-shared', 'client-api'],
  'client-routes': ['client-features'],
  'client-main': ['client-routes'],
}

const policies = Object.entries(layers).map(([type, dependsOn]) => ({
  from: { element: { type } },
  allow: { to: { element: { type: [type, ...dependsOn] } } },
}))

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      'prototypes',
      '.claude',
      'src/client/routes/routeTree.gen.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/client/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooks.configs['recommended-latest'].rules,
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['src/server/**/*.ts', 'drizzle.config.ts'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'import/resolver': { node: { extensions: ['.js', '.ts', '.tsx'] } },
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        { type: 'server-config', pattern: 'src/server/config' },
        { type: 'server-domain', pattern: 'src/server/domain/*' },
        { type: 'server-db', pattern: 'src/server/db/*' },
        { type: 'server-http', pattern: 'src/server/http/*' },
        { type: 'client-api', pattern: 'src/client/api/*' },
        { type: 'client-ui-shared', pattern: 'src/client/ui/shared/*' },
        { type: 'client-ui', pattern: 'src/client/ui/*' },
        { type: 'client-features', pattern: 'src/client/features/*' },
        { type: 'client-routes', pattern: 'src/client/routes' },
        { type: 'server-main', pattern: 'src/server' },
        { type: 'client-main', pattern: 'src/client' },
      ],
    },
    rules: {
      'boundaries/dependencies': ['error', { default: 'disallow', policies }],
      'boundaries/no-unknown-files': 'error',
    },
  },
  prettier,
)
