import React from "react";

import { Typography } from "neetoui";

const Card = ({ title, Icon, description, onClick }) => (
  <div
    className="flex h-[15vh] w-[18vw] cursor-pointer flex-col rounded-lg border border-gray-200 bg-white p-10 shadow-sm transition-all hover:shadow-md"
    {...{ onClick }}
  >
    <div className="flex items-center space-x-2">
      <Icon className="text-xl text-gray-600" />
      <Typography className="text-xl font-semibold" style="h3">
        {title}
      </Typography>
    </div>
    <Typography className="mt-3 text-gray-600" style="body2">
      {description}
    </Typography>
  </div>
);

export default Card;
