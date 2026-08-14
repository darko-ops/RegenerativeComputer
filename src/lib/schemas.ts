import { z } from "zod";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const required = (label: string) =>
  z.string().trim().min(1, `${label} is required`).max(500);

const optionalText = z
  .string()
  .trim()
  .max(2000)
  .optional()
  .transform((v) => (v ? v : undefined));

const email = z
  .string()
  .trim()
  .min(1, "Work email is required")
  .max(320)
  .regex(EMAIL, "Enter a valid email address");

const optionalNumber = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine((v) => v === undefined || !Number.isNaN(Number(v)), "Enter a number")
  .refine((v) => v === undefined || Number(v) >= 0, "Must be zero or greater")
  .transform((v) => (v === undefined ? undefined : Number(v)));

const optionalDate = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine(
    (v) => v === undefined || /^\d{4}-\d{2}-\d{2}$/.test(v),
    "Enter a valid date",
  );

const checkbox = z
  .union([z.literal("on"), z.literal("true"), z.string()])
  .optional()
  .transform((v) => v === "on" || v === "true");

export const GPU_MODELS = ["H100", "H200", "B200", "GB200", "Other"] as const;
export const WORKLOADS = [
  "Training",
  "Fine-tuning",
  "Inference",
  "Research",
  "Other",
] as const;
export const NODE_CONFIGS = ["Single node", "Multi-node"] as const;

export const rfqSchema = z.object({
  // Contact
  name: required("Name"),
  email,
  company: optionalText,

  // Hardware
  gpuModel: z.enum(GPU_MODELS, { message: "Select a GPU type" }),
  gpuModelOther: optionalText,
  gpuQuantity: z
    .string()
    .trim()
    .min(1, "GPU quantity is required")
    .refine((v) => /^\d+$/.test(v), "Enter a whole number")
    .refine((v) => Number(v) > 0, "Must be at least 1")
    .transform(Number),

  // Workload
  workload: z.enum(WORKLOADS, { message: "Select a workload type" }),
  workloadOther: optionalText,

  // Infrastructure
  nodeConfig: z.enum(NODE_CONFIGS, { message: "Select a node configuration" }),
  interconnect: optionalText,
  storage: optionalText,
  region: optionalText,

  // Timing
  earliestStart: optionalDate,
  deadline: optionalDate,
  duration: optionalText,
  interruptible: checkbox,
  flexibleSchedule: checkbox,

  // Commercial
  currentProvider: optionalText,
  currentPricePerGpuHour: optionalNumber,
  maxBudget: optionalNumber,

  notes: optionalText,

  // Anti-spam honeypot
  website: z.string().max(0).optional().or(z.literal("")),
});

export type RfqInput = z.infer<typeof rfqSchema>;

export const supplySchema = z.object({
  name: required("Name"),
  email,
  company: required("Company"),
  companyWebsite: optionalText,

  gpuInventory: required("Available GPU inventory"),
  locations: required("Locations"),
  clusterConfig: optionalText,
  networking: optionalText,
  availabilityDates: optionalText,
  minCommitment: optionalText,
  pricing: optionalText,
  workloadRestrictions: optionalText,
  notes: optionalText,

  website: z.string().max(0).optional().or(z.literal("")),
});

export type SupplyInput = z.infer<typeof supplySchema>;

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
