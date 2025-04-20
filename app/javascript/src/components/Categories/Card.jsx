import React, { useState } from "react";

import { Drag } from "neetoicons";
import { Typography } from "neetoui/index";
import { Trans } from "react-i18next";

import ActionDropdown from "./ActionDropdown";
import DeleteAlert from "./DeleteAlert";

const Card = ({ name, quizzesCount, id, setEditCategoryId }) => {
  const [showIcon, setShowIcon] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

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
        <ActionDropdown {...{ id, setEditCategoryId, setIsDeleteAlertOpen }} />
      </div>
      <DeleteAlert
        {...{ name, id, quizzesCount, isDeleteAlertOpen, setIsDeleteAlertOpen }}
      />
    </div>
  );
};
export default Card;
