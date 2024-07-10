"use client";
import React, { useEffect, useState } from "react";
import { createUser } from "../actions/user.actions";
import { redirect, useRouter } from "next/navigation";

const getDivisions = async () => {
  const res = await fetch("https://bdapis.com/api/v1.2/divisions");
  const data = await res.json();
  return data.data;
};
const getDistricts = async (division: string) => {
  const res = await fetch("https://bdapis.com/api/v1.2/division/" + division);
  const data = await res.json();
  console.log(data);
  return data.data;
};

export default function OnboardingForm() {
  const router = useRouter();
  const [divisions, setDivisions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    division: "",
    district: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [districts, setDistricts] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    number: "",
    division: "",
    district: "",
  });

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [fieldName]: "",
    }));
  };

  const handleNext = (e: any) => {
    e.preventDefault();
    let hasError = false;

    if (currentStep === 1 && !formData.name) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Name is required",
      }));
      hasError = true;
    } else if (
      currentStep === 2 &&
      (!formData.number || !/^0\d{10}$/.test(formData.number))
    ) {
      setErrors((prevState) => ({
        ...prevState,
        number: "Valid number is required (starting with 0 of 11 digits)",
      }));
      hasError = true;
    } else if (currentStep === 3 && !formData.division) {
      setErrors((prevState) => ({
        ...prevState,
        division: "Division is required",
      }));
      hasError = true;
    } else if (currentStep === 4 && !formData.district) {
      setErrors((prevState) => ({
        ...prevState,
        district: "District is required",
      }));
      hasError = true;
    }

    if (!hasError) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const submitForm = (e: any) => {
    e.preventDefault();

    if (!formData.district) {
      setErrors((prevState) => ({
        ...prevState,
        district: "District is required",
      }));
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    createUser(data);
    setFormSuccess(true);
    setFormSuccessMessage("User created successfully");
    console.log("redirecting");

    router.push("/onboard/success");
  };

  useEffect(() => {
    getDivisions().then((data) => setDivisions(data));
    if (formData.division) {
      getDistricts(formData.division).then((data) => setDistricts(data));
    }
  }, [formData.division]);

  return (
    <div className="w-full max-w-lg text-center">
      {formSuccess ? (
        <div>{formSuccessMessage}</div>
      ) : (
        <form
          className="p-10"
          method="POST"
          action="/api/onboard"
          onSubmit={submitForm}
        >
          {currentStep === 1 && (
            <div className="flex flex-col gap-4">
              <label className="label font-bold text-2xl">Name</label>
              <input
                className="input"
                type="text"
                name="name"
                onChange={handleInput}
                value={formData.name}
              />
              {errors.name && <div className="error">{errors.name}</div>}
              <button className="btn" onClick={handleNext}>
                Next
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col gap-4">
              <label className="label font-bold text-2xl">Number</label>
              <input
                className="input"
                type="text"
                name="number"
                onChange={handleInput}
                value={formData.number}
              />
              {errors.number && <div className="error">{errors.number}</div>}
              <button className="btn" onClick={handleNext}>
                Next
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-col gap-4">
              <label className="label font-bold text-2xl">Division</label>
              <select
                className="input"
                name="division"
                onChange={handleInput}
                value={formData.division}
              >
                <option value="">Select Division</option>
                {divisions.map(({ division }) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
              {errors.division && (
                <div className="error">{errors.division}</div>
              )}
              <button className="btn" onClick={handleNext}>
                Next
              </button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex flex-col gap-4">
              <label className="label font-bold text-2xl">District</label>
              <select
                className="input"
                name="district"
                onChange={handleInput}
                value={formData.district}
                disabled={!formData.division}
              >
                <option value="">Select District</option>
                {districts.map(({ district }) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.district && (
                <div className="error">{errors.district}</div>
              )}
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
