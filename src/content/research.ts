export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "pull"; text: string };

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  date: string;
  displayDate: string;
  body: Block[];
};

export const ARTICLES: Article[] = [
  {
    slug: "compute-is-becoming-a-commodity",
    title: "Compute Is Becoming a Commodity",
    dek: "What listed compute futures change about procurement.",
    category: "Markets",
    date: "2026-01-20",
    displayDate: "January 2026",
    body: [
      {
        type: "p",
        text: "For most of the last decade, buying accelerated compute looked like buying enterprise software: a negotiated contract, a named account team, a term commitment, and a price that was largely a function of how much leverage you had at the table. Prices were private. Comparison was manual. Nobody could tell you what the market cleared at, because there was no market — only a set of bilateral relationships.",
      },
      {
        type: "p",
        text: "That arrangement is starting to break down, and the arrival of exchange-listed compute contracts is the clearest signal of it. Once a contract trades on an exchange, the price of the underlying good becomes a public fact rather than a private one. That single change tends to reorganize everything around it.",
      },
      { type: "h2", text: "What listing actually does" },
      {
        type: "p",
        text: "A futures contract is not primarily a way to speculate. It is a way to force agreement on definitions. To list a contract, someone must specify what is being delivered, over what period, at what quality, measured how, and settled against which reference. Those specifications are the real product. They give every participant in the market a shared vocabulary for describing the same good.",
      },
      {
        type: "p",
        text: "Commodity markets follow a recognizable sequence. First the good is standardized. Then a reference price emerges. Then hedging instruments are built on the reference. Then financing and term structure follow, because lenders will underwrite an asset whose forward price is observable. Compute is early in that sequence, not late.",
      },
      {
        type: "pull",
        text: "Standardization comes first. Price discovery follows definitions — not the other way around.",
      },
      { type: "h2", text: "What it does not do" },
      {
        type: "p",
        text: "A listed contract does not make your specific workload fungible. A settlement price is an average over a defined specification; your job runs on particular hardware, in a particular cluster, with particular interconnect and storage, at a particular time. The gap between the reference price and what you actually pay is the basis, and in compute the basis is unusually large and unusually poorly understood.",
      },
      {
        type: "p",
        text: "That gap is where procurement work lives. A reference price tells you whether you are broadly paying above or below the market. It does not tell you which provider can deliver a multi-node topology in your region on your start date, or what the effective price is once utilization, queueing, and interruption are accounted for.",
      },
      { type: "h2", text: "The practical implication" },
      {
        type: "p",
        text: "Buyers should expect the discipline of commodity procurement to arrive in compute: a documented specification, competing quotes against that specification, a defensible record of why a counterparty was selected, and an explicit view on term versus spot. Teams that already run procurement this way for power or bandwidth will find the transition familiar. Teams that have only ever signed one-off cloud contracts will not.",
      },
      {
        type: "list",
        items: [
          "Write the requirement down as a specification, not as a provider preference.",
          "Solicit comparable quotes rather than sequential negotiations.",
          "Separate the reference price question from the delivery question.",
          "Track what you actually paid against what the market indicated at the time.",
        ],
      },
      {
        type: "p",
        text: "None of this requires believing that compute will trade like crude oil. It only requires accepting that the price of compute is becoming observable, and that observable prices change buyer behavior.",
      },
    ],
  },
  {
    slug: "the-compute-benchmark-problem",
    title: "The Compute Benchmark Problem",
    dek: "Why a GPU-hour is not a standardized unit of delivered compute.",
    category: "Measurement",
    date: "2026-02-17",
    displayDate: "February 2026",
    body: [
      {
        type: "p",
        text: "Every compute market quotes in GPU-hours. It is a convenient unit and a misleading one. Two offers at the same nominal price for the same accelerator can deliver materially different amounts of usable work, and the difference is not a rounding error.",
      },
      { type: "h2", text: "Where the unit leaks" },
      {
        type: "p",
        text: "A GPU-hour prices an allocation, not an outcome. The delivered value of that allocation depends on properties the unit does not describe:",
      },
      {
        type: "list",
        items: [
          "Interconnect. Multi-node training performance is governed by the fabric between accelerators at least as much as by the accelerators themselves.",
          "Topology and placement. Nodes scattered across a datacenter are not equivalent to nodes in a contiguous, well-placed block.",
          "Storage path. A pipeline that starves on data throughput converts paid GPU-hours into idle GPU-hours.",
          "Availability semantics. Reserved, on-demand, and interruptible capacity are three different goods sold under one unit.",
          "Operational reality. Node failure rates, restart behavior, checkpoint cost, and queue times all reduce effective delivered compute.",
          "Software environment. Driver, kernel, and framework versions can move throughput on identical silicon.",
        ],
      },
      {
        type: "pull",
        text: "A price per GPU-hour is a price per allocation. What buyers actually consume is delivered throughput on their own workload.",
      },
      { type: "h2", text: "Why this is a market problem, not a vendor problem" },
      {
        type: "p",
        text: "In a bilateral world, this ambiguity is absorbed by relationships. You learn which provider is good, and you stay. In a market with reference prices and competing offers, ambiguity becomes an arbitrage: the cheapest quote wins on paper while delivering less, and the discipline of comparison quietly rewards whoever is loosest with their definitions.",
      },
      {
        type: "p",
        text: "This is the failure mode any commodity market has to solve early. Grain has grades. Power has delivery points and firmness. Bandwidth has service definitions. Compute has, so far, a single unit that conflates a dozen distinct properties.",
      },
      { type: "h2", text: "Toward a usable specification" },
      {
        type: "p",
        text: "The near-term fix is not a universal benchmark. Universal benchmarks tend to be gamed and tend to correlate poorly with any specific workload. The fix is a disciplined specification attached to every quote: hardware and quantity, node count and interconnect, storage characteristics, region, availability class, window and duration, and the workload type the capacity is intended for.",
      },
      {
        type: "p",
        text: "That specification does two things. It makes offers comparable at the point of decision, and it produces a record that can later be checked against what was actually delivered. Over enough transactions, the second is what makes an honest benchmark possible: measurement grounded in observed procurement rather than in a synthetic test.",
      },
      {
        type: "p",
        text: "The unit will not be fixed by asserting a better one. It will be fixed by accumulating comparable observations of what a GPU-hour actually delivered, and under what conditions.",
      },
    ],
  },
  {
    slug: "the-compute-futures-oracle-problem",
    title: "The Compute Futures Oracle Problem",
    dek: "How financial benchmarks establish the integrity of underlying price observations.",
    category: "Market structure",
    date: "2026-03-24",
    displayDate: "March 2026",
    body: [
      {
        type: "p",
        text: "Every derivative settles against something. That something is a benchmark, and a benchmark is only as good as the observations underneath it. This is the oracle problem, and it is not new: it has been worked through, sometimes painfully, in interest rates, in energy, and in physical commodities.",
      },
      { type: "h2", text: "What went wrong elsewhere" },
      {
        type: "p",
        text: "The instructive failures share a shape. A benchmark is constructed from submissions or from a thin set of reported transactions. Participants who report are also participants who are exposed to the benchmark. The reporting process is not independently verifiable. The incentive to shade a submission is small per observation and large in aggregate. Reform, when it comes, moves the benchmark toward observed transactions and away from opinion.",
      },
      {
        type: "pull",
        text: "The credibility of a settlement price is inherited from the credibility of the observations beneath it.",
      },
      { type: "h2", text: "Why compute is a hard case" },
      {
        type: "p",
        text: "Compute inherits every structural difficulty and adds several of its own. Transactions are private and often bespoke. The good is not standardized, so two observations may not describe the same thing. Contract lengths vary from hours to years. A meaningful share of capacity never transacts at arm's length at all, because it sits inside vertically integrated operators. And the population of sellers is concentrated enough that a small number of reporters could move a poorly designed index.",
      },
      { type: "h2", text: "What a defensible benchmark would require" },
      {
        type: "list",
        items: [
          "Observations tied to real transactions or real firm quotes, not indicative opinion.",
          "A published specification, so every observation describes a comparable good.",
          "Independence between the entity constructing the benchmark and the parties exposed to it.",
          "Transparent methodology: inclusion criteria, weighting, outlier handling, and minimum sample thresholds.",
          "An audit trail sufficient to reconstruct any published value after the fact.",
          "Explicit treatment of thin markets, including the choice not to publish.",
        ],
      },
      {
        type: "p",
        text: "The last point is the one most often skipped. A benchmark that always prints is a benchmark that will eventually print something it cannot defend. Mature methodologies specify the conditions under which no value is published.",
      },
      { type: "h2", text: "Where the observations come from" },
      {
        type: "p",
        text: "There is no shortcut to a credible compute benchmark. It requires an accumulating record of specified requirements met with competing, dated, firm offers — the ordinary exhaust of a procurement process run with discipline. Build the procurement layer honestly and the observation layer follows. Attempt the index first and you are publishing opinion.",
      },
      {
        type: "p",
        text: "We are starting with execution for that reason. Price discovery is downstream of transactions, and transactions are downstream of standardized requirements.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
