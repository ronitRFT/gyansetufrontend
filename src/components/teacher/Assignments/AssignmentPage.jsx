import React, { useState } from "react";
import { Check, ChevronDown, User } from "lucide-react";

// Import our component stages
import TemplateSelection from "./TemplateSelection";
import ContentCreation from "./ContentCreation";
import SettingsConfiguration from "./SeetingConfig";
import ReviewComponent from "./EnhancedReview";

export default function AssignmentCreatorMain() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState("quiz");
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    timeLimit: "",
    dueDate: "",
    subject: "",
    gradeLevel: "",
    difficulty: "medium",
    sections: [],
  });

  // Handle moving to next step
  const handleNextStep = (data) => {
    if (currentStep < 4) {
      if (data) {
        setAssignmentData({ ...assignmentData, ...data });
      }
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle moving to previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-1 mb-10">
        <div className="flex items-center justify-between">
          {["Template", "Content", "Settings", "Review"].map((step, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full text-sm font-medium ${
                  currentStep > index + 1
                    ? "bg-purple-600 text-white"
                    : currentStep === index + 1
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-600"
                } shadow-sm transition-all duration-200`}
              >
                {currentStep > index + 1 ? (
                  <Check className="w-6 h-6" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`mt-2 text-sm ${
                  currentStep === index + 1
                    ? "font-medium text-purple-800"
                    : "text-gray-600"
                }`}
              >
                {step}
              </span>

              {/* Connecting line */}
              {index < 3 && (
                <div className="absolute left-12 top-6 w-full h-0.5 bg-gray-200">
                  <div
                    className="h-full bg-purple-500 transition-all duration-300"
                    style={{ width: currentStep > index + 1 ? "100%" : "0%" }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {currentStep === 1 && (
          <TemplateSelection
            onNext={handleNextStep}
            onSelectTemplate={handleTemplateSelect}
          />
        )}
        {currentStep === 2 && (
          <ContentCreation
            onNext={handleNextStep}
            onPrevious={handlePrevStep}
            selectedTemplate={selectedTemplate}
          />
        )}
        {currentStep === 3 && (
          <SettingsConfiguration
            onNext={handleNextStep}
            onPrevious={handlePrevStep}
            assignmentData={assignmentData}
          />
        )}
        {currentStep === 4 && (
          <ReviewComponent
            onPrevious={handlePrevStep}
            finalAssignment={{ ...assignmentData, template: selectedTemplate }}
          />
        )}
      </main>
    </div>
  );
}
