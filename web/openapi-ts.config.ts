import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-axios',
  input: '../api/swaggerdocs/swagger.json',
  output: 'src/lib/client',
});
