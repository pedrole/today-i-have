## Running the Project in Development Mode

`composer run dev`

## Linting & Formatting

This project uses **Pint** for code formatting and **PHPCS** for linting.

### Format Code

Format your code with Pint (respects Laravel conventions):

```bash
vendor/bin/pint
```

Format a specific file or directory:

```bash
vendor/bin/pint app/Http/Controllers
```

### Lint Code

Check code style and custom rules (max 40 lines per method):

```bash
vendor/bin/phpcs app/
```

### Auto-fix Issues

PHPCS can fix some issues automatically:

```bash
vendor/bin/phpcbf app/
```

### VS Code Integration

- **Formatter**: Install extension `me-dutour-mathieu.vscode-pint` for auto-format on save.
- **Linter**: Install extension `ValeryanM.vscode-phpsab` for inline PHPCS diagnostics.

### CI/CD

Run both formatters and linters in CI:

```bash
composer run test:lint
```

Or separately:

```bash
vendor/bin/pint --test
vendor/bin/phpcs app/
```
