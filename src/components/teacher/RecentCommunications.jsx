import React from "react";

const RecentCommunications = ({ selectedClass, selectedSection }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-medium mb-4">Recent Communications</h2>
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-medium">Message from Parent</h3>
            <p className="text-gray-600 text-sm">
              Regarding: Student from Class {selectedClass}-{selectedSection}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentCommunications;
