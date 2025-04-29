import React, { useState } from "react";
import { Check, BookOpen, PenTool, Zap, Folder } from "lucide-react";

export default function TemplateSelection({ onNext, onSelectTemplate }) {
  const [selectedTemplate, setSelectedTemplate] = useState("quiz");

  // Templates available
  const templates = [
    {
      id: "quiz",
      name: "Quiz Template",
      description: "Multiple choice questions with automatic grading",
      icon: <BookOpen className="w-10 h-10 text-purple-600" />,
    },
    {
      id: "written",
      name: "Written Assignment",
      description: "Long-form responses with rubric-based grading",
      icon: <PenTool className="w-10 h-10 text-purple-600" />,
    },
    {
      id: "interactive",
      name: "Interactive Game",
      description: "Gamified assessment for engaging learning",
      icon: <Zap className="w-10 h-10 text-purple-600" />,
    },
    {
      id: "project",
      name: "Project Based",
      description: "Collaborative or individual project work",
      icon: <Folder className="w-10 h-10 text-purple-600" />,
    },
  ];

  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    if (onSelectTemplate) {
      onSelectTemplate(templateId);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-purple-500">
      <h2 className="text-2xl font-bold mb-8 text-purple-800">
        Choose Template
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-5 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedTemplate === template.id
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-purple-300"
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div className="flex items-start">
              <div className="mr-4 bg-purple-100 p-3 rounded-full">
                {template.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {template.description}
                </p>
              </div>
              {selectedTemplate === template.id && (
                <div className="ml-auto">
                  <Check className="w-6 h-6 text-purple-500" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-end">
        <button
          onClick={() => onNext(selectedTemplate)}
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium shadow-sm"
        >
          Continue to Content
        </button>
      </div>
    </div>
  );
}
