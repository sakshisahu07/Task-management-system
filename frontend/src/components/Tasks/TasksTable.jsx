import React from 'react';

const TasksTable = ({ tasks }) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-teal-600 text-white">
        <h2 className="text-2xl font-bold">All Tasks ({tasks.length})</h2>
        <p className="text-sm text-teal-200">Manage all your tasks effectively</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-teal-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Task ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Completed</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-300">
            {tasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-200 transition duration-300">
                <td className="px-6 py-4 text-sm text-gray-600">{task._id}</td>
                <td className="px-6 py-4 text-gray-700 font-medium">{task.title}</td>
                <td className="px-6 py-4 text-gray-600">{task.description}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    task.status === 'In-Progress' ? 'bg-blue-100 text-blue-800' :
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{task.assignedTo || 'Not Assigned'}</td>
                <td className="px-6 py-4 text-gray-600">{task.completed ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 text-gray-600">{new Date(task.dueDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <button className="text-teal-600 hover:text-teal-800 mr-2 font-medium">Edit</button>
                  <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksTable;
