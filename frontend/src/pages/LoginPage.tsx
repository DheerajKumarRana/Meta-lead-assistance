import { useState, type ChangeEvent, type FormEvent } from 'react';

import { useAuth } from '../auth/AuthContext';

type LoginForm = {
  organizationSlug: string;
  email: string;
  password: string;
};

type AuthValue = {
  login: (credentials: LoginForm) => Promise<void>;
};

const LoginPage = () => {
  const { login } = useAuth() as AuthValue;
  const [form, setForm] = useState<LoginForm>({
    organizationSlug: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field: keyof LoginForm) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(form);
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to sign in.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'h-11 w-full rounded-xl border border-hairline bg-panel-2/60 px-3.5 text-[0.9375rem] text-bone placeholder:text-muted focus:bg-panel';

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">
      {/* A soft wash of colour behind the card — the backdrop Apple uses on its sign-in pages. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-linear-to-r from-[#5ac8fa]/25 via-[#5856d6]/20 to-[#ff2d55]/15 blur-3xl"
      />

      <section className="animate-rise relative w-full max-w-[24rem]">
        <div className="mb-8 flex flex-col items-center text-center">
          <span
            aria-hidden="true"
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-[1.125rem] bg-linear-to-b from-[#3a3a3c] to-[#1d1d1f] text-2xl font-bold text-[#fff] shadow-lg"
          >
            V
          </span>
          <p className="text-[0.9375rem] font-medium text-muted">Vistaar Lead Console</p>
          <h1 className="mt-1 text-[1.75rem] font-semibold tracking-[-0.025em] text-bone">Sign in</h1>
        </div>

        <div className="surface rounded-[1.375rem] p-6 shadow-xl sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-4" aria-label="Sign in">
            <div>
              <label htmlFor="organizationSlug" className="mb-1.5 block text-[0.8125rem] font-medium text-bone-dim">
                Organization
              </label>
              <input
                id="organizationSlug"
                type="text"
                autoComplete="organization"
                required
                value={form.organizationSlug}
                onChange={updateField('organizationSlug')}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[0.8125rem] font-medium text-bone-dim">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={form.email}
                onChange={updateField('email')}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[0.8125rem] font-medium text-bone-dim">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={updateField('password')}
                className={inputClass}
              />
            </div>

            {error ? (
              <p
                role="alert"
                className="rounded-xl bg-danger/10 px-3.5 py-2.5 text-[0.8125rem] text-danger"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="btn-key mt-2 h-11 w-full rounded-xl text-[0.9375rem]"
            >
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
