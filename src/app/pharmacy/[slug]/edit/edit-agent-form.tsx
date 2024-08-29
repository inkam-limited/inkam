import { Agent } from "@prisma/client";

const EditAgentForm = ({ agent }: { agent: Agent }) => {
  console.log(agent);

  return <div>EditAgentForm</div>;
};

export default EditAgentForm;
