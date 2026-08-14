"use client";

import { useActionState } from "react";
import { submitRfq } from "@/lib/actions";
import { GPU_MODELS, NODE_CONFIGS, WORKLOADS } from "@/lib/schemas";
import type { FormState } from "@/lib/schemas";
import {
  Field,
  FieldGroup,
  FormNotice,
  OptionRow,
  Select,
  SubmitButton,
  TextArea,
  TextInput,
  Toggle,
} from "@/components/form-fields";
import { PrimaryLink, SecondaryLink } from "@/components/ui";

const INITIAL: FormState = { status: "idle" };

export function RfqForm() {
  const [state, action, pending] = useActionState(submitRfq, INITIAL);

  if (state.status === "success") {
    return (
      <div className="border border-rule bg-paper-raised p-10 sm:p-14">
        <p className="label text-signal">Request received</p>
        <h2 className="mt-6 font-display text-3xl leading-snug font-light text-ink">
          Your specification is logged.
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

      <FieldGroup
        step="01"
        title="Contact"
        description="Where the offers should go."
      >
        <Field label="Name" htmlFor="name" required error={err("name")}>
          <TextInput
            id="name"
            name="name"
            autoComplete="name"
            required
            invalid={!!err("name")}
          />
        </Field>
        <Field label="Work email" htmlFor="email" required error={err("email")}>
          <TextInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            invalid={!!err("email")}
          />
        </Field>
        <Field label="Company" htmlFor="company" error={err("company")} full>
          <TextInput
            id="company"
            name="company"
            autoComplete="organization"
            invalid={!!err("company")}
          />
        </Field>
      </FieldGroup>

      <FieldGroup
        step="02"
        title="Hardware"
        description="What you need to run on."
      >
        <Field
          label="GPU type"
          htmlFor="gpuModel"
          required
          error={err("gpuModel")}
        >
          <Select
            id="gpuModel"
            name="gpuModel"
            defaultValue=""
            required
            invalid={!!err("gpuModel")}
          >
            <option value="" disabled>
              Select
            </option>
            {GPU_MODELS.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          label="GPU quantity"
          htmlFor="gpuQuantity"
          required
          error={err("gpuQuantity")}
        >
          <TextInput
            id="gpuQuantity"
            name="gpuQuantity"
            inputMode="numeric"
            placeholder="e.g. 256"
            required
            className="tnum"
            invalid={!!err("gpuQuantity")}
          />
        </Field>
        <Field
          label="If other, specify"
          htmlFor="gpuModelOther"
          error={err("gpuModelOther")}
          full
        >
          <TextInput
            id="gpuModelOther"
            name="gpuModelOther"
            placeholder="e.g. MI300X, TPU v5p"
            invalid={!!err("gpuModelOther")}
          />
        </Field>
      </FieldGroup>

      <FieldGroup
        step="03"
        title="Workload"
        description="What the capacity is for."
      >
        <Field
          label="Workload type"
          htmlFor="workload"
          required
          error={err("workload")}
        >
          <Select
            id="workload"
            name="workload"
            defaultValue=""
            required
            invalid={!!err("workload")}
          >
            <option value="" disabled>
              Select
            </option>
            {WORKLOADS.map((workload) => (
              <option key={workload} value={workload}>
                {workload}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          label="If other, specify"
          htmlFor="workloadOther"
          error={err("workloadOther")}
        >
          <TextInput
            id="workloadOther"
            name="workloadOther"
            invalid={!!err("workloadOther")}
          />
        </Field>
      </FieldGroup>

      <FieldGroup
        step="04"
        title="Infrastructure"
        description="The properties a GPU-hour price does not capture."
      >
        <Field label="Node configuration" required error={err("nodeConfig")} full>
          <OptionRow name="nodeConfig" options={NODE_CONFIGS} />
        </Field>
        <Field
          label="Interconnect requirements"
          htmlFor="interconnect"
          hint="e.g. InfiniBand NDR, 3.2 Tb/s per node, RoCE acceptable"
          error={err("interconnect")}
        >
          <TextInput
            id="interconnect"
            name="interconnect"
            invalid={!!err("interconnect")}
          />
        </Field>
        <Field
          label="Storage"
          htmlFor="storage"
          hint="Capacity, throughput, and whether a shared filesystem is required"
          error={err("storage")}
        >
          <TextInput
            id="storage"
            name="storage"
            invalid={!!err("storage")}
          />
        </Field>
        <Field
          label="Region"
          htmlFor="region"
          hint="Preferred locations, or any hard residency constraints"
          error={err("region")}
          full
        >
          <TextInput id="region" name="region" invalid={!!err("region")} />
        </Field>
      </FieldGroup>

      <FieldGroup
        step="05"
        title="Timing"
        description="Temporal flexibility is often the largest lever on price."
      >
        <Field
          label="Earliest start"
          htmlFor="earliestStart"
          error={err("earliestStart")}
        >
          <TextInput
            id="earliestStart"
            name="earliestStart"
            type="date"
            className="tnum"
            invalid={!!err("earliestStart")}
          />
        </Field>
        <Field label="Deadline" htmlFor="deadline" error={err("deadline")}>
          <TextInput
            id="deadline"
            name="deadline"
            type="date"
            className="tnum"
            invalid={!!err("deadline")}
          />
        </Field>
        <Field
          label="Expected duration"
          htmlFor="duration"
          hint="e.g. 6 weeks, 12 months, ongoing"
          error={err("duration")}
          full
        >
          <TextInput
            id="duration"
            name="duration"
            invalid={!!err("duration")}
          />
        </Field>
        <Toggle
          name="interruptible"
          label="Interruptible"
          description="The workload can tolerate preemption, given checkpointing."
        />
        <Toggle
          name="flexibleSchedule"
          label="Flexible scheduling"
          description="The start window can move to capture better pricing or availability."
        />
      </FieldGroup>

      <FieldGroup
        step="06"
        title="Commercial"
        description="Optional. It sharpens the comparison, and we never disclose it to providers."
      >
        <Field
          label="Current provider"
          htmlFor="currentProvider"
          error={err("currentProvider")}
        >
          <TextInput
            id="currentProvider"
            name="currentProvider"
            invalid={!!err("currentProvider")}
          />
        </Field>
        <Field
          label="Current $/GPU-hour"
          htmlFor="currentPricePerGpuHour"
          error={err("currentPricePerGpuHour")}
        >
          <TextInput
            id="currentPricePerGpuHour"
            name="currentPricePerGpuHour"
            inputMode="decimal"
            placeholder="e.g. 2.75"
            className="tnum"
            invalid={!!err("currentPricePerGpuHour")}
          />
        </Field>
        <Field
          label="Maximum budget"
          htmlFor="maxBudget"
          hint="Total USD for the engagement"
          error={err("maxBudget")}
        >
          <TextInput
            id="maxBudget"
            name="maxBudget"
            inputMode="decimal"
            className="tnum"
            invalid={!!err("maxBudget")}
          />
        </Field>
        <Field
          label="Anything else"
          htmlFor="notes"
          error={err("notes")}
          full
        >
          <TextArea id="notes" name="notes" invalid={!!err("notes")} />
        </Field>
      </FieldGroup>

      {/* Honeypot */}
      <div aria-hidden className="hidden">
        <label htmlFor="rfq-website">Website</label>
        <input id="rfq-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 border-t border-rule pt-8 lg:grid-cols-[220px_1fr] lg:gap-12">
        <div />
        <div className="flex flex-col gap-4">
          <SubmitButton pending={pending}>Submit RFQ</SubmitButton>
          <p className="max-w-md text-xs leading-relaxed text-ink-faint">
            Submitting a request does not create an obligation to transact.
            Regenerative Computer acts as an agent; the provider you select
            remains the underlying compute counterparty.
          </p>
        </div>
      </div>
    </form>
  );
}
