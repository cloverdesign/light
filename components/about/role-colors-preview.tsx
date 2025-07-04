"use client";

import React from "react";

const RoleColorsPreview: React.FC = () => {
  // Sample roles to demonstrate different color schemes
  const sampleRoles = [
    { role: "Pastor", type: "Pastor/Leadership" },
    { role: "Assistant Group Pastor", type: "Pastor/Leadership" },
    { role: "Head of Administration", type: "Head/Director" },
    { role: "Head of Foundation School", type: "Head/Director" },
    { role: "Fellowship Coordinator", type: "Coordinator" },
    { role: "Program Coordinator", type: "Coordinator" },
    { role: "PFCC Officer", type: "Officer" },
    { role: "Finance Officer", type: "Officer" },
    { role: "Foundation School", type: "Foundation/School" },
    { role: "Lighthouse Group", type: "Group/Team" },
    { role: "SMU Chapter", type: "Group/Team" },
    { role: "Assistant Pastor", type: "Assistant" },
    { role: "Fellowship Leader", type: "Fellowship" },
  ];

  // Function to get role colors based on role content (same as in team-leader-card)
  const getRoleColors = (role: string, fallbackIndex: number = 0) => {
    const roleLower = role.toLowerCase();

    if (roleLower.includes("pastor") || roleLower.includes("leader")) {
      return {
        bg: "bg-deep-blue-500",
        text: "text-white",
      };
    }

    if (roleLower.includes("head") || roleLower.includes("director")) {
      return {
        bg: "bg-orange-500",
        text: "text-white",
      };
    }

    if (roleLower.includes("coordinator")) {
      return {
        bg: "bg-aero-500",
        text: "text-white",
      };
    }

    if (roleLower.includes("officer")) {
      return { bg: "bg-yellow-500", text: "text-yellow-900" };
    }

    if (roleLower.includes("foundation") || roleLower.includes("school")) {
      return {
        bg: "bg-green-500",
        text: "text-white",
      };
    }

    if (roleLower.includes("group") || roleLower.includes("team")) {
      return {
        bg: "bg-purple-500",
        text: "text-white",
      };
    }

    if (roleLower.includes("assistant")) {
      return {
        bg: "bg-blue-500",
        text: "text-white",
      };
    }

    if (roleLower.includes("fellowship")) {
      return {
        bg: "bg-rose-500",
        text: "text-white",
      };
    }

    const defaultColors = [
      { bg: "bg-gray-500", text: "text-white" },
      { bg: "bg-indigo-500", text: "text-white" },
      { bg: "bg-teal-500", text: "text-white" },
      { bg: "bg-amber-500", text: "text-amber-900" },
    ];
    return defaultColors[fallbackIndex % defaultColors.length];
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Team Leader Role Colors Preview
      </h2>

      <div className="space-y-6">
        {/* Group by role type */}
        {[
          "Pastor/Leadership",
          "Head/Director",
          "Coordinator",
          "Officer",
          "Foundation/School",
          "Group/Team",
          "Assistant",
          "Fellowship",
        ].map((category) => {
          const categoryRoles = sampleRoles.filter(
            (item) => item.type === category,
          );

          return (
            <div key={category} className="border-l-4 border-gray-200 pl-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                {category} Roles
              </h3>
              <div className="flex flex-wrap gap-3">
                {categoryRoles.map((item, index) => {
                  const colors = getRoleColors(item.role, index);
                  return (
                    <span
                      key={`${category}-${index}`}
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${colors.bg} ${colors.text} shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200`}
                    >
                      {item.role}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Color Key */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Color Scheme Logic
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-deep-blue-500 rounded"></div>
              <span>
                <strong>Pastor/Leadership:</strong> Deep blue theme
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>
                <strong>Head/Director:</strong> Orange theme
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-aero-500 rounded"></div>
              <span>
                <strong>Coordinator:</strong> Aero theme
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>
                <strong>Officer:</strong> Yellow theme
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>
                <strong>Foundation/School:</strong> Green theme
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span>
                <strong>Group/Team:</strong> Purple theme
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>
                <strong>Assistant:</strong> Blue theme
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-rose-500 rounded"></div>
              <span>
                <strong>Fellowship:</strong> Rose theme
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Colors are automatically assigned based on role keywords for better
          semantic meaning.
        </p>
      </div>
    </div>
  );
};

export default RoleColorsPreview;
