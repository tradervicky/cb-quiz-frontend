import { toast } from "sonner";

export async function copyToClipboard(text: any) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}

export function getFinalStatus(
  expiryDate: string | Date,
  status: string
): "Expired" | "Completed" | "Ongoing" {
  const expiry = new Date(expiryDate);
  const now = new Date();

  if (status === "COMPLETED") {
    return "Completed";
  } else if (expiry < now) {
    return "Expired";
  } else {
    return "Ongoing";
  }
}
