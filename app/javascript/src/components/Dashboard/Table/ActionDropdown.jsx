import React from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Dropdown } from "neetoui/index";

const ActionDropdown = ({
  handlePublish,
  record,
  t,
  setIsDeleteAlertOpen,
  handleClone,
  setQuizToDelete,
}) => (
  <Dropdown
    buttonStyle="text"
    icon={MenuHorizontal}
    position="bottom-end"
    strategy="fixed"
  >
    <Dropdown.Menu>
      <Dropdown.MenuItem.Button
        className="text-black"
        style="link"
        onClick={() =>
          handlePublish({
            quizId: record.id,
            status: record.status === "published" ? "draft" : "published",
          })
        }
      >
        {record.status === "published"
          ? t("quiz.unpublish")
          : t("quiz.publish")}
      </Dropdown.MenuItem.Button>
      <Dropdown.MenuItem.Button
        className="text-black"
        style="link"
        onClick={() => handleClone(record.id)}
      >
        {t("button.clone")}
      </Dropdown.MenuItem.Button>
      <Dropdown.Divider />
      <Dropdown.MenuItem.Button
        label={t("button.delete")}
        style="danger"
        type="delete"
        onClick={() => {
          setQuizToDelete(record);
          setIsDeleteAlertOpen(true);
        }}
      >
        {t("button.delete")}
      </Dropdown.MenuItem.Button>
    </Dropdown.Menu>
  </Dropdown>
);

export default ActionDropdown;
