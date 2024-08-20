import React from "react";
import {
  Html,
  Tailwind,
  Body,
  Container,
  Heading,
  Text,
  Section,
} from "@react-email/components";
import config from "../../tailwind.config";
import { Invoice } from "@prisma/client";

const InvoiceEmail = ({
  invoice,
  agentData,
}: {
  invoice: Invoice;
  agentData: {
    agentId: string;
    agentName: string;
    _sum: { [key: string]: number | null };
  }[];
}) => {
  return (
    <Html>
      <Tailwind config={config}>
        <Body className="bg-gray-100 font-sans">
          <Container className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <Section className="bg-white p-4 rounded-lg mb-4">
              <Heading className="text-2xl font-bold p-4 mb-4 bg-blue-600 text-white">
                Invoice
              </Heading>
              <Text className="text-gray-700 mb-4">
                <strong>Status:</strong>{" "}
                {invoice?.disbursed ? "Closed" : "Open"}
              </Text>
              <Text className="text-gray-700 mb-4">
                <strong>Date:</strong> {invoice?.createdAt.toDateString()}
              </Text>
              <Text className="text-gray-700 mb-4">
                <strong>Amount:</strong> BDT {invoice?.amount}
              </Text>
              <Text className="text-gray-700 mb-4">
                <strong>Inkam Commission:</strong>
              </Text>
            </Section>

            <Section className="bg-gray-100 p-4 rounded-lg mb-4">
              <Heading className="text-xl font-bold mb-4 text-blue-600">
                Invoice Details
              </Heading>
              {agentData.map((agent, index) => (
                <div key={index} className="mb-4">
                  <Text className="text-gray-700">
                    <strong>Agent {index + 1}:</strong> {agent.agentName}
                  </Text>
                  <div className="grid grid-cols-2 items-center">
                    <div className="py-4">
                      <Text className="text-lg font-bold">Agent Name</Text>
                      <Text className="text-lg">Payment Amount</Text>
                    </div>
                    <div className="py-4">
                      <Text className="text-lg font-bold">
                        {agent.agentName}
                      </Text>
                      <Text className="text-lg">
                        BDT <span className="ml-0.5">{agent._sum.inkam}</span>
                      </Text>
                    </div>
                  </div>
                  {index < agentData.length - 1 && <span className="my-4" />}
                </div>
              ))}
            </Section>

            <Text className="text-gray-700 mb-4">
              Please review the invoice details and proceed with the necessary
              actions.
            </Text>
            <Text className="text-gray-700 mb-4">Thank you,</Text>
            <Text className="text-gray-700 font-semibold">Inkam PTE LTD.</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InvoiceEmail;
