import React, { useState } from "react";

import ActionDropdown from "components/Redirections/Form/ActionDropdown";
import { Drag } from "neetoicons";
import { Typography } from "neetoui/index";
import { Trans } from "react-i18next";

const Card = ({ name, quizzesCount }) => {
  const [showIcon, setShowIcon] = useState(false);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="h-10 w-10 justify-self-end">{showIcon && <Drag />}</div>
      <div
        className=" flex h-[10vh] w-[85vw] cursor-move items-center justify-between space-y-2 border-b bg-white p-5 hover:bg-slate-200"
        onMouseOut={() => setShowIcon(false)}
        onMouseOver={() => setShowIcon(true)}
      >
        <div>
          <Typography style="h3">{name}</Typography>
          <Typography className="text-gray-400" style="body2">
            <Trans
              values={{ totalSize: quizzesCount }}
              i18nKey={`subheader.filters.totalSize${
                quizzesCount <= 1 ? "One" : "Other"
              }`}
            />
          </Typography>
        </div>
        <ActionDropdown />
      </div>
    </div>
  );
};
export default Card;
