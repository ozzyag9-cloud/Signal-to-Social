export type Tier = "free" | "silver" | "gold" | "premium";

export function getUserTier(): Tier {
  // TEMP: replace with real auth later
  return "premium";
}
