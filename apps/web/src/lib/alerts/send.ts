import { getUserTier } from "../user/tier";

export async function sendAlert(message: string) {
  const tier = getUserTier();

  if (tier === "free") return;

  console.log("ALERT:", message);

  // Future integrations:
  // WhatsApp API
  // Messenger API
  // Email
}
