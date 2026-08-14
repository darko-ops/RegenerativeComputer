"use client";

import { useActionState } from "react";
import { logIn, type LoginState } from "./actions";
import { Field, SubmitButton, TextInput } from "@/components/form-fields";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    logIn,
    {},
  );

  return (
    <form
      action={action}
      className="max-w-sm border border-rule bg-paper-raised p-8"
    >
      <p className="label text-ink-faint">Internal</p>
      <h1 className="mt-4 font-display text-2xl font-normal text-ink">
        Submissions
      </h1>
      <div className="mt-8">
        <Field
          label="Password"
          htmlFor="password"
          required
          error={state.error}
        >
          <TextInput
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            invalid={!!state.error}
          />
        </Field>
      </div>
      <div className="mt-6">
        <SubmitButton pending={pending}>Sign in</SubmitButton>
      </div>
    </form>
  );
}
