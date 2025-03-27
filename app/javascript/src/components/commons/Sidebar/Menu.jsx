import React from "react";

import classNames from "classnames";
import { NeetoQuiz, Settings, Globe } from "neetoicons";
import { NavLink } from "react-router-dom";

const Menu = ({ isExpanded }) => (
  <div
    className={classNames(
      "flex h-full w-full flex-col bg-white p-4 shadow-lg transition-all",
      {
        "h-0 w-0 opacity-0": !isExpanded,
      }
    )}
  >
    <div className="mb-4">
      <div className="flex items-center space-x-2 rounded-lg bg-blue-500 p-2 text-white">
        <NeetoQuiz />
        <span className="font-semibold">Quizzes</span>
      </div>
      <div className="mt-2 space-y-2">
        <NavLink
          className="flex items-center justify-between rounded p-2 hover:bg-gray-100"
          to="/"
        >
          <span>All</span>
          <span className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700">
            30
          </span>
        </NavLink>
        <NavLink
          className="flex items-center justify-between rounded p-2 hover:bg-gray-100"
          to="/published"
        >
          <span>Published</span>
          <span className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700">
            22
          </span>
        </NavLink>
        <NavLink
          className="flex items-center justify-between rounded p-2 hover:bg-gray-100"
          to="/drafts"
        >
          <span>Draft</span>
          <span className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700">
            8
          </span>
        </NavLink>
      </div>
    </div>
    <div className="space-y-2">
      <NavLink
        className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100"
        to="/settings"
      >
        <Settings />
        <span>Settings</span>
      </NavLink>
      <NavLink
        className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100"
        to="/public"
      >
        <Globe />
        <span>Public Page</span>
      </NavLink>
    </div>
    <div className="mt-auto border-t pt-4">
      <div className="flex items-center space-x-2 p-2">
        <img
          alt="Profile"
          className="rounded-full"
          src="https://via.placeholder.com/24"
        />
        <div>
          <p className="text-sm font-semibold">Oliver Smith</p>
          <p className="text-xs text-gray-500">oliver@example.com</p>
        </div>
      </div>
      <NavLink
        className="flex items-center space-x-2 rounded p-2 text-red-500 hover:bg-gray-100"
        to="/logout"
      >
        <span>←</span>
        <span>Logout</span>
      </NavLink>
    </div>
  </div>
);

export default Menu;
