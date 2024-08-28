import prisma from "@/db";
import EditAgentForm from "./edit-agent-form";
const EditPharmacyPage = async ({ params }: { params: { slug: string } }) => {
  const agent = await prisma.agent.findUnique({
    where: {
      agentId: params.slug,
    },
  });
  if (!agent) {
    return <div>Agent not found</div>;
  }

  return (
    <div>
      <EditAgentForm agent={agent} />
    </div>
  );
};

export default EditPharmacyPage;
