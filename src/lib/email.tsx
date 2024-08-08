import React from "react";
import {
  Html,
  Tailwind,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";
import config from "../../tailwind.config";

const DiagnosticConfirmationEmail = ({
  patientName,
  patientNumber,
  testName,
  address,
}: {
  patientName: string;
  patientNumber: string;
  testName: string;
  address: string;
}) => {
  return (
    <Html>
      <Tailwind config={config}>
        <Body className="bg-gray-100 font-sans ">
          <Container className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="bg-white p-4 rounded-lg mb-4">
              <Heading className="text-2xl font-bold p-4 mb-4 bg-blue-600 text-white">
                Appointment Confirmation for Diagnostic Services
              </Heading>
              <Text className="text-gray-700 mb-4">Dear Diagnostic Team,</Text>
              <Text className="text-gray-700 mb-4">
                We are writing to confirm the latest appointment for the
                following patient. Please review the details below:
              </Text>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <Text className="text-gray-700">
                  <strong>Patient Name:</strong> {patientName}
                </Text>
                <Text className="text-gray-700">
                  <strong>Patient Number:</strong> {patientNumber}
                </Text>
                <Text className="text-gray-700">
                  <strong>Test Name:</strong> {testName}
                </Text>
                <Text className="text-gray-700">
                  <strong>Patient Location:</strong> {address}
                </Text>
              </div>
              <Text className="text-gray-700 mb-4">
                Please ensure all necessary arrangements are made for the
                diagnostic services required.
              </Text>
              <Text className="text-gray-700 mb-4">Thank you,</Text>
              <Text className="text-gray-700 font-semibold">
                Inkam PTE LTD.
              </Text>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default DiagnosticConfirmationEmail;
