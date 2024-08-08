"use client";
import DiagnosticConfirmationEmail from "@/lib/email";
import React from "react";

const page = () => {
  return (
    <div>
      <DiagnosticConfirmationEmail
        patientName="John Doe"
        patientNumber="123456789"
        testName="Blood Test"
        address="123 Main Street, New York, NY 10010"
      />
    </div>
  );
};

export default page;
