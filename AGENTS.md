# AGENTS.md

## Build, Lint, and Test Commands

- **Build the project**: `yarn build` or `npm run build`
- **Start development server**: `yarn dev` or `npm run dev`
- **Generate static files**: `yarn generate` or `npm run generate`
- **Run ESLint**: `yarn lint` or `npm run lint`
- **Run a single test**: Add a test runner (e.g., Jest or Vitest) to the project for single-test execution.

## Code Style Guidelines

1. **Imports**:
   - Use ES module syntax (`import/export`).
   - Group imports: external libraries first, followed by internal modules.

2. **Formatting**:
   - Follow Prettier defaults (e.g., 2 spaces for indentation).
   - Ensure consistent line breaks and spacing.

3. **Types**:
   - Use TypeScript for type safety.
   - Prefer `interface` for object types and `type` for unions.

4. **Naming Conventions**:
   - Use camelCase for variables and functions.
   - Use PascalCase for components and classes.
   - Prefix private variables with an underscore (`_`).

5. **Error Handling**:
   - Use `try/catch` for async operations.
   - Log errors with meaningful messages.

6. **Linting**:
   - ESLint is configured via `@nuxt/eslint`.
   - Extend rules in `.nuxt/eslint.config.mjs` as needed.

7. **File Structure**:
   - Organize code by feature/module.
   - Place shared utilities in the `lib/` directory.

8. **CSS**:
   - Use TailwindCSS for styling.
   - Add global styles in `assets/css/main.css`.

## Notes
- This project uses Nuxt 3 with TypeScript and TailwindCSS.
- Prisma is integrated for database management.
- TRPC is used for API routing.
