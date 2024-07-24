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

  console.log(pharmacy);
  return <LeadFrom pharmacy={pharmacy} />;
};

export default GeneratePharmacyLeadPage;
