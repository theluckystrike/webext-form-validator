/**
 * Form Validator — Input validation for extension UIs
 */
export interface ValidationRule { test: (value: string) => boolean; message: string; }

export class FormValidator {
    private rules = new Map<string, ValidationRule[]>();

    /** Add rule to field */
    addRule(fieldId: string, rule: ValidationRule): this {
        const list = this.rules.get(fieldId) || [];
        list.push(rule); this.rules.set(fieldId, list); return this;
    }

    /** Required field */
    required(fieldId: string, message?: string): this {
        return this.addRule(fieldId, { test: (v) => v.trim().length > 0, message: message || 'This field is required' });
    }

    /** Min length */
    minLength(fieldId: string, min: number): this {
        return this.addRule(fieldId, { test: (v) => v.length >= min, message: `Minimum ${min} characters` });
    }

    /** Max length */
    maxLength(fieldId: string, max: number): this {
        return this.addRule(fieldId, { test: (v) => v.length <= max, message: `Maximum ${max} characters` });
    }

    /** Email format */
    email(fieldId: string): this {
        return this.addRule(fieldId, { test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: 'Invalid email format' });
    }

    /** URL format */
    url(fieldId: string): this {
        return this.addRule(fieldId, { test: (v) => { try { new URL(v); return true; } catch { return false; } }, message: 'Invalid URL' });
    }

    /** Custom regex */
    pattern(fieldId: string, regex: RegExp, message: string): this {
        return this.addRule(fieldId, { test: (v) => regex.test(v), message });
    }

    /** Validate a single field */
    validateField(fieldId: string, value: string): { valid: boolean; errors: string[] } {
        const rules = this.rules.get(fieldId) || [];
        const errors = rules.filter((r) => !r.test(value)).map((r) => r.message);
        return { valid: errors.length === 0, errors };
    }

    /** Validate all fields from a form element */
    validateForm(form: HTMLFormElement): { valid: boolean; errors: Map<string, string[]> } {
        const errors = new Map<string, string[]>();
        let valid = true;
        this.rules.forEach((rules, fieldId) => {
            const el = form.querySelector(`#${fieldId}`) as HTMLInputElement;
            const value = el?.value || '';
            const result = this.validateField(fieldId, value);
            if (!result.valid) { valid = false; errors.set(fieldId, result.errors); }
        });
        return { valid, errors };
    }

    /** Enable real-time validation */
    attachLiveValidation(containerId?: string): void {
        const container = containerId ? document.getElementById(containerId) : document;
        this.rules.forEach((_, fieldId) => {
            const el = container?.querySelector(`#${fieldId}`) as HTMLInputElement;
            if (el) el.addEventListener('input', () => {
                const { errors } = this.validateField(fieldId, el.value);
                const errEl = container?.querySelector(`#${fieldId}-error`);
                if (errEl) { errEl.textContent = errors[0] || ''; errEl.classList.toggle('visible', errors.length > 0); }
            });
        });
    }

    /** Password strength (0-4) */
    static passwordStrength(password: string): number {
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return Math.min(4, score);
    }
}
