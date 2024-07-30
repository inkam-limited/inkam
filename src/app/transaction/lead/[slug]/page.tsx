import prisma from "@/db";
import { z } from "zod";
import LeadFrom from "./LeadFrom";

const GeneratePharmacyLeadPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const pharmacy = await prisma.agent.findUnique({
    where: { id: params.slug },
  });

  if (!pharmacy) {
    return <div>Pharmacy not found</div>;
  }

  return (
    <main className="py-12">
      <h2 className="text-xl mb-4">
        Generate Lead for <span className="font-bold">{pharmacy.name}</span>
      </h2>
      <LeadFrom pharmacy={pharmacy} />
    </main>
  );
};

export default GeneratePharmacyLeadPage;
