import { toast } from "sonner";

export async function copyToClipboard(text: any) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}
