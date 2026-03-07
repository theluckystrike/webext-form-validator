[![CI](https://github.com/theluckystrike/webext-form-validator/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-form-validator/actions)
[![npm](https://img.shields.io/npm/v/webext-form-validator)](https://www.npmjs.com/package/webext-form-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# WEBEXT-FORM-VALIDATOR

Form validation library for Chrome extensions built with TypeScript. Provides field validators, custom rules, error messages, real-time validation, and password strength checking for Manifest V3.

## INSTALLATION

```bash
npm install webext-form-validator
```

## QUICK START

```typescript
import { FormValidator } from 'webext-form-validator';

const validator = new FormValidator();
validator.required('email').email('email').minLength('password', 8);
validator.attachLiveValidation();
```

## API REFERENCE

### FormValidator Class

```typescript
const v = new FormValidator();
```

### Adding Rules

Chain validators on fields to build validation rules.

```typescript
v.required('username')
v.minLength('password', 8)
v.maxLength('bio', 200)
v.email('email')
v.url('website')
v.pattern('phone', /^\+?[\d\s-]+$/, 'Invalid phone format')
```

### Custom Rules

Add custom validation rules with the `addRule` method.

```typescript
v.addRule('fieldId', {
  test: (value: string) => value.startsWith('prefix'),
  message: 'Value must start with prefix'
});
```

### Validating Fields

Validate a single field and get results.

```typescript
const result = v.validateField('email', 'user@example.com');
// { valid: true, errors: [] }
```

### Validating Forms

Validate all registered fields within an HTML form element.

```typescript
const form = document.getElementById('myForm') as HTMLFormElement;
const result = v.validateForm(form);
// { valid: boolean, errors: Map<string, string[]> }
```

### Real-time Validation

Attach live validation to input events. Error messages display in elements with id `{fieldId}-error`.

```typescript
v.attachLiveValidation();
v.attachLiveValidation('containerId');
```

### Password Strength

Calculate password strength on a scale of 0-4.

```typescript
const strength = FormValidator.passwordStrength('MyP@ssw0rd');
// Returns: 0 (weak) to 4 (strong)
```

Strength calculation criteria:
- Score increases with length >= 8
- Score increases with length >= 12
- Score increases with mixed case (upper + lower)
- Score increases with digits
- Score increases with special characters

## TYPE DEFINITIONS

```typescript
interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}
```

## ABOUT

This library is maintained by theluckystrike and powers form validation in Chrome extensions at zovo.one.

## LICENSE

MIT License - See LICENSE file for details.

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
