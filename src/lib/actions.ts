"use server";

import { getSql } from "@/lib/db";
import {
  fieldErrors,
  rfqSchema,
  supplySchema,
  type FormState,
} from "@/lib/schemas";

function toObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

const GENERIC_ERROR =
  "We could not record your submission. Email hello@regenerativecomputer.com and we will pick it up directly.";

export async function submitRfq(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = rfqSchema.safeParse(toObject(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  const d = parsed.data;

  // Honeypot filled → accept silently, store nothing.
  if (d.website) {
    return { status: "success", message: "Request received." };
  }

  try {
    const sql = getSql();
    await sql`
      insert into rfq (
        name, email, company,
        gpu_model, gpu_model_other, gpu_quantity,
        workload, workload_other,
        node_config, interconnect, storage, region,
        earliest_start, deadline, duration, interruptible, flexible_schedule,
        current_provider, current_price_per_gpu_hour, max_budget,
        notes
      ) values (
        ${d.name}, ${d.email}, ${d.company ?? null},
        ${d.gpuModel}, ${d.gpuModelOther ?? null}, ${d.gpuQuantity},
        ${d.workload}, ${d.workloadOther ?? null},
        ${d.nodeConfig}, ${d.interconnect ?? null}, ${d.storage ?? null}, ${d.region ?? null},
        ${d.earliestStart ?? null}, ${d.deadline ?? null}, ${d.duration ?? null},
        ${d.interruptible}, ${d.flexibleSchedule},
        ${d.currentProvider ?? null}, ${d.currentPricePerGpuHour ?? null}, ${d.maxBudget ?? null},
        ${d.notes ?? null}
      )
    `;
  } catch (error) {
    console.error("[rfq] insert failed", error);
    return { status: "error", message: GENERIC_ERROR };
  }

  return {
    status: "success",
    message:
      "Request received. We will come back with comparable offers against this specification.",
  };
}

export async function submitSupply(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = supplySchema.safeParse(toObject(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  const d = parsed.data;

  if (d.website) {
    return { status: "success", message: "Submission received." };
  }

  try {
    const sql = getSql();
    await sql`
      insert into supply_partner (
        name, email, company, company_website,
        gpu_inventory, locations, cluster_config, networking,
        availability_dates, min_commitment, pricing, workload_restrictions,
        notes
      ) values (
        ${d.name}, ${d.email}, ${d.company}, ${d.companyWebsite ?? null},
        ${d.gpuInventory}, ${d.locations}, ${d.clusterConfig ?? null}, ${d.networking ?? null},
        ${d.availabilityDates ?? null}, ${d.minCommitment ?? null}, ${d.pricing ?? null},
        ${d.workloadRestrictions ?? null},
        ${d.notes ?? null}
      )
    `;
  } catch (error) {
    console.error("[supply] insert failed", error);
    return { status: "error", message: GENERIC_ERROR };
  }

  return {
    status: "success",
    message:
      "Submission received. We will be in touch about routing qualified requirements to you.",
  };
}
