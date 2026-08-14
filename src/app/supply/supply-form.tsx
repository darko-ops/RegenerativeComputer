"use client";

import { useActionState } from "react";
import { submitSupply } from "@/lib/actions";
import type { FormState } from "@/lib/schemas";
import {
  Field,
  FieldGroup,
  FormNotice,
  SubmitButton,
  TextArea,
  TextInput,
} from "@/components/form-fields";
import { PrimaryLink, SecondaryLink } from "@/components/ui";

const INITIAL: FormState = { status: "idle" };

export function SupplyForm() {
  const [state, action, pending] = useActionState(submitSupply, INITIAL);

  if (state.status === "success") {
    return (
      <div className="border border-rule bg-paper-raised p-10 sm:p-14">
        <p className="label text-signal">Submission received</p>
        <h2 className="mt-6 font-display text-3xl leading-snug font-light text-ink">
          Your capacity is on file.
        </h2>
        <p className="mt-4 max-w-lg text-[15px] leading-[1.75] text-ink-soft">
          {state.message}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <PrimaryLink href="/markets">See compute markets</PrimaryLink>
          <SecondaryLink href="/research">Read our research</SecondaryLink>
        </div>
      </div>
    );
  }

  const err = (key: string) => state.errors?.[key];

  return (
    <form action={action} className="space-y-12">
      {state.status === "error" && state.message && (
        <FormNotice status="error" message={state.message} />
      )}

      <FieldGroup step="01" title="Contact" description="Who we route demand to.">
        <Field label="Name" htmlFor="s-name" required error={err("name")}>
          <TextInput
            id="s-name"
            name="name"
            autoComplete="name"
            required
            invalid={!!err("name")}
          />
        </Field>
        <Field
          label="Work email"
          htmlFor="s-email"
          required
          error={err("email")}
        >
          <TextInput
            id="s-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            invalid={!!err("email")}
          />
        </Field>
        <Field
          label="Company"
          htmlFor="s-company"
          required
          error={err("company")}
        >
          <TextInput
            id="s-company"
            name="company"
            autoComplete="organization"
            required
            invalid={!!err("company")}
          />
        </Field>
        <Field
          label="Website"
          htmlFor="s-companyWebsite"
          error={err("companyWebsite")}
        >
          <TextInput
            id="s-companyWebsite"
            name="companyWebsite"
            invalid={!!err("companyWebsite")}
          />
        </Field>
      </FieldGroup>

      <FieldGroup
        step="02"
        title="Capacity"
        description="What you can deliver, and where."
      >
        <Field
          label="Available GPU inventory"
          htmlFor="gpuInventory"
          hint="Accelerator types and quantities"
          required
          error={err("gpuInventory")}
          full
        >
          <TextArea
            id="gpuInventory"
            name="gpuInventory"
            required
            invalid={!!err("gpuInventory")}
          />
        </Field>
        <Field
          label="Locations"
          htmlFor="locations"
          hint="Datacenter regions and jurisdictions"
          required
          error={err("locations")}
        >
          <TextInput
            id="locations"
            name="locations"
            required
            invalid={!!err("locations")}
          />
        </Field>
        <Field
          label="Cluster configuration"
          htmlFor="clusterConfig"
          hint="Node shape, block sizes, contiguity"
          error={err("clusterConfig")}
        >
          <TextInput
            id="clusterConfig"
            name="clusterConfig"
            invalid={!!err("clusterConfig")}
          />
        </Field>
        <Field
          label="Networking"
          htmlFor="networking"
          hint="Fabric, topology, per-node bandwidth"
          error={err("networking")}
          full
        >
          <TextInput
            id="networking"
            name="networking"
            invalid={!!err("networking")}
          />
        </Field>
      </FieldGroup>

      <FieldGroup
        step="03"
        title="Terms"
        description="Enough to match you against live requirements."
      >
        <Field
          label="Availability dates"
          htmlFor="availabilityDates"
          error={err("availabilityDates")}
        >
          <TextInput
            id="availabilityDates"
            name="availabilityDates"
            invalid={!!err("availabilityDates")}
          />
        </Field>
        <Field
          label="Minimum commitment"
          htmlFor="minCommitment"
          hint="Minimum quantity and term"
          error={err("minCommitment")}
        >
          <TextInput
            id="minCommitment"
            name="minCommitment"
            invalid={!!err("minCommitment")}
          />
        </Field>
        <Field
          label="Pricing"
          htmlFor="pricing"
          hint="Indicative rates and the structures you support"
          error={err("pricing")}
        >
          <TextInput
            id="pricing"
            name="pricing"
            invalid={!!err("pricing")}
          />
        </Field>
        <Field
          label="Workload restrictions"
          htmlFor="workloadRestrictions"
          error={err("workloadRestrictions")}
        >
          <TextInput
            id="workloadRestrictions"
            name="workloadRestrictions"
            invalid={!!err("workloadRestrictions")}
          />
        </Field>
        <Field label="Anything else" htmlFor="s-notes" error={err("notes")} full>
          <TextArea id="s-notes" name="notes" invalid={!!err("notes")} />
        </Field>
      </FieldGroup>

      {/* Honeypot */}
      <div aria-hidden className="hidden">
        <label htmlFor="supply-website">Website</label>
        <input
          id="supply-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 border-t border-rule pt-8 lg:grid-cols-[220px_1fr] lg:gap-12">
        <div />
        <div className="flex flex-col gap-4">
          <SubmitButton pending={pending}>Become a supply partner</SubmitButton>
          <p className="max-w-md text-xs leading-relaxed text-ink-faint">
            Inventory details are used to match your capacity against incoming
            requirements. We do not publish partner-level pricing.
          </p>
        </div>
      </div>
    </form>
  );
}
