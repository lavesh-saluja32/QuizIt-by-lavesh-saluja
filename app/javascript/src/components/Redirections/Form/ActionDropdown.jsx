import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Dropdown } from "neetoui";

const ActionDropdown = ({ handleEdit, t, handleDelete, disabled }) => (
  <Dropdown
    buttonProps={{ className: "ml-10" }}
    buttonStyle="text"
    icon={MenuHorizontal}
    position="bottom-end"
    strategy="fixed"
  >
    <Dropdown.Menu>
      <Dropdown.MenuItem.Button onClick={handleEdit} {...{ disabled }}>
        {t("button.edit")}
      </Dropdown.MenuItem.Button>
      <Dropdown.MenuItem.Button type="delete" onClick={handleDelete}>
        {t("button.delete")}
      </Dropdown.MenuItem.Button>
    </Dropdown.Menu>
  </Dropdown>
);

export default withT(ActionDropdown);
