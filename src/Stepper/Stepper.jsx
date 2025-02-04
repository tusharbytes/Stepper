import React, { useState } from "react";

const initialFormState = {
  fullName: "",
  email: "",
  address: "",
  phoneNumber: "",

};

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [formDataSubmitted, setFormDataSubmitted] = useState(null);

  const steps = [
    [{ label: "Full Name", type: "text", name: "fullName" }, { label: "Email", type: "email", name: "email" }],
    [{ label: "Address", type: "text", name: "address" }, { label: "Phone Number", type: "tel", name: "phoneNumber" }],
    [{ label: "Do you have a driving license?", type: "radio", name: "License", options: ["Yes", "No"] }],
    [{ label: "Do you own a car?", type: "radio", name: "Own Car", options: ["Yes", "No"] }],
    [{ label: "Are you 18 or older ?", type: "radio", name: "18+", options: ["Yes", "No"] }],
  ];

  const validateFields = () => {
    let newErrors = {};

    steps[activeStep].forEach((field) => {
      const value = formValues[field.name];

      if (!value) {
        newErrors[field.name] = `${field.label} is required`;
      }

      if (field.name === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = "Invalid email format";
        }
      }

      if (field.name === "phoneNumber" && value) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
          newErrors[field.name] = "Phone number must be 10 digits";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleNext = () => {
    if (validateFields()) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      setFormDataSubmitted(formValues);
      console.log("Form submitted with data: ", formValues);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center   p-4">
      {/* Stepper Progress */}
      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold ${index <= activeStep ? "bg-orange-400 text-white" : "bg-gray-300"
                }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="mt-2 h-2 bg-gray-300 rounded-lg relative">
          <div
            className="h-2 bg-orange-400 rounded-lg"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white p-8 mt-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Fill The Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps[activeStep].map((field) => (
              <div key={field.name}>
                <label className="block text-gray-700 font-medium">{field.label}</label>

                {field.type === "radio" ? (
                  <div className="flex gap-4 mt-2">
                    {field.options.map((option) => (
                      <label key={option} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name={field.name}
                          value={option}
                          checked={formValues[field.name] === option}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-indigo-500 focus:ring-indigo-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formValues[field.name]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}

                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              disabled={activeStep === 0}
              type="button"
              className="px-6 py-2 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-600 disabled:opacity-0"
            >
              Back
            </button>

            {activeStep === steps.length - 1 ? (
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                type="button"
                disabled={activeStep === steps.length - 1}
                className="px-6 py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 disabled:bg-gray-300"
              >
                Next
              </button>
            )}
          </div>

          {formDataSubmitted && (
            <div className="mt-6 p-6 bg-green-100 text-green-700 rounded-lg shadow-lg w-full">
              <h3 className="font-semibold">Submitted Data:</h3>
              <pre className="text-sm">{JSON.stringify(formDataSubmitted, null, 2)}</pre>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
