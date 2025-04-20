import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Dropdown } from "neetoui";

const ActionDropdown = ({
  t,
  disabled,
  id,
  setEditCategoryId,
  setIsDeleteAlertOpen,
}) => (
  <Dropdown
    buttonProps={{ className: "ml-10" }}
    buttonStyle="text"
    icon={MenuHorizontal}
    position="bottom-end"
    strategy="fixed"
  >
    <Dropdown.Menu>
      <Dropdown.MenuItem.Button
        onClick={() => setEditCategoryId(id)}
        {...{ disabled }}
      >
        {t("button.edit")}
      </Dropdown.MenuItem.Button>
      <Dropdown.MenuItem.Button
        type="delete"
        onClick={() => setIsDeleteAlertOpen(true)}
      >
        {t("button.delete")}
      </Dropdown.MenuItem.Button>
    </Dropdown.Menu>
  </Dropdown>
);

export default withT(ActionDropdown);
