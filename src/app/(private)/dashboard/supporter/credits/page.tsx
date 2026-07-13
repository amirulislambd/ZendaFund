import PurchaseCreditGrid from "@/components/dashboard/supporter/PurchaseCreditGrid";
import { UserSessionToSSR } from "@/lib/core/session";
import { CREDIT_PACKAGES } from "@/lib/data/creditPackages";

import { User } from "@/types";


export default async function CreditPage() {
  const user = await UserSessionToSSR();

  return (
    <PurchaseCreditGrid
      user={user as User}
      packages={CREDIT_PACKAGES
      }
    />
  );
}