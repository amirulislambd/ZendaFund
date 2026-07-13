import { CreditCard } from "lucide-react";
import { CREDIT_PACKAGES } from "@/lib/data/creditPackages";

export default function PurchaseCreditGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CREDIT_PACKAGES.map((pkg) => (
        <form key={pkg.id} action="/api/checkout" method="POST">
          <input type="hidden" name="packageId" value={pkg.id} />
          <button
            type="submit"
            className="flex w-full flex-col items-center gap-2 rounded-2xl border border-(--border) bg-(--surface) p-6 text-center transition-all hover:border-(--accent)"
          >
            <CreditCard className="h-8 w-8 text-(--accent)" />
            <p className="text-2xl font-bold text-(--foreground)">{pkg.credits} credits</p>
            <p className="text-sm text-(--muted)">${pkg.priceUsd}</p>
          </button>
        </form>
      ))}
    </div>
  );
}