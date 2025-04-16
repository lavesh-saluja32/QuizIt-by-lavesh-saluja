import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Dropdown } from "neetoui/index";

const CardDropdown = ({
  questionId,
  handleDelete,
  handleEditNavigation,
  handleClone,
  questionNumber,
  t,
}) => {
  const { Menu, MenuItem, Divider } = Dropdown;
  const { Button: MenuButton } = MenuItem;

  return (
    <Dropdown
      buttonStyle="text"
      icon={MenuHorizontal}
      position="bottom-end"
      strategy="fixed"
    >
      <Menu>
        <MenuItem>
          <MenuButton
            className="text-black"
            style="link"
            onClick={() => handleEditNavigation({ questionId, questionNumber })}
          >
            {t("button.edit")}
          </MenuButton>
        </MenuItem>
        <MenuItem>
          <MenuButton
            className="text-black"
            style="link"
            onClick={() => handleClone(questionId)}
          >
            {t("button.clone")}
          </MenuButton>
        </MenuItem>
        <Divider />
        <MenuItem>
          <MenuButton
            label="Delete"
            style="danger"
            type="delete"
            onClick={() => handleDelete(questionId)}
          >
            {t("button.delete")}
          </MenuButton>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default withT(CardDropdown);
