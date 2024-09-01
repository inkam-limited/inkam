import prisma from "@/db";
import { z } from "zod";
import LeadFrom from "./LeadFrom";

const GeneratePharmacyLeadPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const pharmacy = await prisma.agent.findUnique({
    where: { agentId: params.slug },
  });

  if (!pharmacy) {
    return <div>Pharmacy not found</div>;
  }

  return (
    <main className="py-12">
      <h2 className="text-xl mb-4">
        Generate Lead for <br />
        <span className="font-bold text-3xl tracking-tight py-2 text-blue-400">
          {pharmacy.name}
        </span>
      </h2>
      <LeadFrom pharmacy={pharmacy} />
    </main>
  );
};

export default GeneratePharmacyLeadPage;
