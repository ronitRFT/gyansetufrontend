import React, { useState } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

const UpcomingTasks = () => {
  const [selectedClass, setSelectedClass] = useState("6");
  const [selectedSection, setSelectedSection] = useState("A");

  const [tasksByClassSection, setTasksByClassSection] = useState({
    "6-A": [
      { id: 1, description: "Grade Quiz - Class 6-A", completed: false },
      {
        id: 2,
        description: "Prepare Test Papers for Class 6-A",
        completed: false,
      },
    ],
    "6-B": [
      { id: 3, description: "Grade Quiz - Class 6-B", completed: false },
      {
        id: 4,
        description: "Prepare Test Papers for Class 6-B",
        completed: false,
      },
    ],
  });

  const [checkedTasks, setCheckedTasks] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupClass, setPopupClass] = useState("6");
  const [popupSection, setPopupSection] = useState("A");
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const updateTaskDescriptions = (newClass, newSection) => {
    setTasksByClassSection((prev) => {
      const updatedTasks = { ...prev };
      const classSectionKey = `${selectedClass}-${selectedSection}`;
      const newClassSectionKey = `${newClass}-${newSection}`;

      if (updatedTasks[classSectionKey]) {
        updatedTasks[classSectionKey] = updatedTasks[classSectionKey].map(
          (task) => {
            const taskType = task.description.split(" - ")[0];
            return {
              ...task,
              description: `${taskType} - Class ${newClass}-${newSection}`,
            };
          }
        );
      }

      if (!updatedTasks[newClassSectionKey]) {
        updatedTasks[newClassSectionKey] = [];
      }

      return updatedTasks;
    });
  };

  const handleClassChange = (e) => {
    const newClass = e.target.value;
    setSelectedClass(newClass);
    updateTaskDescriptions(newClass, selectedSection);
  };

  const handleSectionChange = (e) => {
    const newSection = e.target.value;
    setSelectedSection(newSection);
    updateTaskDescriptions(selectedClass, newSection);
  };

  const handleCheckboxChange = (taskId) => {
    if (checkedTasks.includes(taskId)) {
      setCheckedTasks(checkedTasks.filter((id) => id !== taskId));
    } else {
      setCheckedTasks([...checkedTasks, taskId]);
    }
  };

  const handleUpdate = () => {
    setTasksByClassSection((prev) => {
      const updatedTasks = { ...prev };
      const classSectionKey = `${selectedClass}-${selectedSection}`;
      updatedTasks[classSectionKey] = updatedTasks[classSectionKey].map(
        (task) =>
          checkedTasks.includes(task.id) ? { ...task, completed: true } : task
      );
      return updatedTasks;
    });
    setCheckedTasks([]);
  };

  const filteredTasks = (
    tasksByClassSection[`${selectedClass}-${selectedSection}`] || []
  ).filter((task) =>
    task.description.includes(`Class ${selectedClass}-${selectedSection}`)
  );

  const handlePopupClassChange = (e) => {
    setPopupClass(e.target.value);
  };

  const handlePopupSectionChange = (e) => {
    setPopupSection(e.target.value);
  };

  const handleAddNewTask = () => {
    if (!newTaskDescription.trim()) return;

    const classSectionKey = `${popupClass}-${popupSection}`;
    const newTask = {
      id: Date.now(),
      description: `${newTaskDescription} - Class ${popupClass}-${popupSection}`,
      completed: false,
    };

    setTasksByClassSection((prev) => {
      const updatedTasks = { ...prev };
      if (!updatedTasks[classSectionKey]) {
        updatedTasks[classSectionKey] = [];
      }
      updatedTasks[classSectionKey].push(newTask);
      return updatedTasks;
    });

    setNewTaskDescription("");
    setShowAddTaskForm(false);
  };

  return (
    <div className="relative">
      <div className="bg-gray-200 p-4 md:p-6 rounded-4xl w-full mb-6 relative">
        {/* Explore Icon */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <IoSearchOutline className="text-2xl" />
        </button>

        {/* Header with Heading and Dropdowns */}
        <div className="flex flex-col items-start mb-4 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">
            Upcoming Tasks
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <div className="flex items-center">
              <label
                htmlFor="classSelectTasks"
                className="mr-2 text-gray-600 text-sm w-24"
              >
                Select Class:
              </label>
              <select
                id="classSelectTasks"
                value={selectedClass}
                onChange={handleClassChange}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {[...Array(7)].map((_, i) => (
                  <option key={i} value={6 + i}>
                    Class {6 + i}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <label
                htmlFor="sectionSelectTasks"
                className="mr-2 text-gray-600 text-sm w-24"
              >
                Select Section:
              </label>
              <select
                id="sectionSelectTasks"
                value={selectedSection}
                onChange={handleSectionChange}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {["A", "B", "C", "D", "E", "F"].map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* White Layer with Tasks */}
        <div className="bg-white rounded-2xl p-4 md:p-6">
          <div className="space-y-3">
            {filteredTasks.filter((task) => !task.completed).length > 0 ? (
              filteredTasks
                .filter((task) => !task.completed)
                .map((task) => (
                  <div key={task.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-5 w-5 accent-purple-600"
                      checked={checkedTasks.includes(task.id)}
                      onChange={() => handleCheckboxChange(task.id)}
                    />
                    <span>{task.description}</span>
                  </div>
                ))
            ) : (
              <div className="text-gray-500">No uncompleted tasks</div>
            )}
          </div>

          {checkedTasks.length > 0 && (
            <button
              onClick={handleUpdate}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Update
            </button>
          )}

          {filteredTasks.filter((task) => task.completed).length > 0 && (
            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-800 mb-2">
                Completed Tasks
              </h3>
              <div className="space-y-3">
                {filteredTasks
                  .filter((task) => task.completed)
                  .map((task) => (
                    <div key={task.id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-purple-600"
                        checked={true}
                        disabled
                      />
                      <span className="text-gray-500 line-through">
                        {task.description}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
          <div className="bg-white rounded-lg p-6 sm:p-6 w-full max-w-lg sm:max-w-lg max-h-[80vh] overflow-y-auto shadow-lg mx-4 sm:mx-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">All Tasks</h3>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>

            {/* Class and Section Selection for Adding New Task */}
            <div className="mb-4">
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                <div className="flex items-center">
                  <label
                    htmlFor="popupClassSelect"
                    className="mr-2 text-gray-600 text-sm w-24"
                  >
                    Select Class:
                  </label>
                  <select
                    id="popupClassSelect"
                    value={popupClass}
                    onChange={handlePopupClassChange}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {[...Array(7)].map((_, i) => (
                      <option key={i} value={6 + i}>
                        Class {6 + i}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="popupSectionSelect"
                    className="mr-2 text-gray-600 text-sm w-24"
                  >
                    Select Section:
                  </label>
                  <select
                    id="popupSectionSelect"
                    value={popupSection}
                    onChange={handlePopupSectionChange}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {["A", "B", "C", "D", "E", "F"].map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Add New Task Button Centered Below - Hidden when form is open */}
              {!showAddTaskForm && (
                <div className="flex justify-center mt-3">
                  <button
                    onClick={() => setShowAddTaskForm(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    Add New Task
                  </button>
                </div>
              )}
            </div>

            {/* Add New Task Form */}
            {showAddTaskForm && (
              <div className="mb-4">
                <input
                  type="text"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  placeholder="Enter task description"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddNewTask}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => setShowAddTaskForm(false)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* List of All Tasks */}
            <div className="space-y-4">
              {Object.keys(tasksByClassSection).length > 0 ? (
                Object.keys(tasksByClassSection).map((classSection) => (
                  <div key={classSection}>
                    <h4 className="text-md font-semibold text-gray-800 mb-2">
                      {classSection}
                    </h4>
                    {tasksByClassSection[classSection].length > 0 ? (
                      tasksByClassSection[classSection].map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-3 ml-4"
                        >
                          <input
                            type="checkbox"
                            className="h-5 w-5 accent-purple-600"
                            checked={task.completed}
                            disabled
                          />
                          <span
                            className={
                              task.completed ? "text-gray-500 line-through" : ""
                            }
                          >
                            {task.description}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 ml-4">
                        No tasks available
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No tasks available</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingTasks;
