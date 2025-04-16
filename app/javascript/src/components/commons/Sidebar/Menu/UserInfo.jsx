import React from "react";

import { getFromLocalStorage } from "@bigbinary/neeto-commons-frontend/utils";
import { Typography } from "@bigbinary/neetoui";
import useLogout from "hooks/reactQuery/useLogout";
import { User, LeftArrow } from "neetoicons";
import { useTranslation } from "react-i18next";

const MenuUserInfo = () => {
  const { t } = useTranslation();
  const { mutate: logoutUser } = useLogout();

  const userName = getFromLocalStorage("authUserName");
  const userEmail = getFromLocalStorage("authEmail");

  return (
    <div className="mt-auto border-t pt-4">
      <div className="flex items-center space-x-2 p-2">
        <User />
        <div>
          <Typography className="text-sm font-semibold">{userName}</Typography>
          <Typography className="text-xs text-gray-500">{userEmail}</Typography>
        </div>
      </div>
      <div
        className="flex cursor-pointer items-center space-x-2 rounded p-2 text-red-500 hover:bg-gray-100"
        onClick={logoutUser}
      >
        <LeftArrow size={20} />
        <Typography>{t("button.logout")}</Typography>
      </div>
    </div>
  );
};

export default MenuUserInfo;
