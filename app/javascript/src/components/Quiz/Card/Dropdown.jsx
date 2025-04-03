import React from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { t } from "i18next";
import { Dropdown } from "neetoui/index";

const CardDropdown = ({ questionId, handleDelete, handleEditNavigation }) => {
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
            onClick={() => handleEditNavigation(questionId)}
          >
            {t("button.edit")}
          </MenuButton>
        </MenuItem>
        <MenuItem>
          <MenuButton className="text-black" style="link">
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

export default CardDropdown;
