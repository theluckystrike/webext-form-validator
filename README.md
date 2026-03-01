# webext-form-validator — Form Validation for Extensions
> **Built by [Zovo](https://zovo.one)** | `npm i webext-form-validator`

Built-in rules, live validation, password strength, and form-level validation.

```typescript
import { FormValidator } from 'webext-form-validator';
const v = new FormValidator();
v.required('email').email('email').minLength('password', 8);
v.attachLiveValidation();
```
MIT License
