# CONTRIBUTING GUIDE

Thank you for your interest in contributing to webext-form-validator.

## REPORTING ISSUES

When reporting bugs or requesting features, please use the GitHub issue templates. Provide as much detail as possible:

- Clear description of the issue or feature request
- Steps to reproduce (for bugs)
- Expected behavior vs actual behavior
- Environment details (browser, extension version, etc.)

## DEVELOPMENT WORKFLOW

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes following the code style guidelines
4. Test your changes thoroughly
5. Submit a pull request

## CODE STYLE

This project follows standard TypeScript conventions:

- Use TypeScript for all new code
- Run `npm run build` before committing to ensure TypeScript compiles without errors
- Keep the public API surface minimal and well-documented
- Use meaningful variable and function names

## TESTING

Before submitting changes:

1. Ensure TypeScript compiles without errors
2. Test your changes in a Chrome extension environment
3. Verify backward compatibility with existing API

```bash
npm run build
```

## LICENSE

By contributing to this project, you agree that your contributions will be licensed under the MIT License.
