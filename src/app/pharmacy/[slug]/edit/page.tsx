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
      <div className="flex justify-between items-center py-8">
        <h1 className="text-3xl font-bold text-neutral-300">Edit Agent</h1>
      </div>
      <EditAgentForm agent={agent} />
    </div>
  );
};

export default EditPharmacyPage;
