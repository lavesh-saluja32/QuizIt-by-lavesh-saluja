import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Dropdown } from "neetoui";

const ActionDropdown = ({
  handlePublish,
  record,
  t,
  setIsDeleteAlertOpen,
  handleClone,
  setQuizToDelete,
}) => {
  const isPublished = record.status === "published";
  const publishLabel = isPublished ? t("quiz.unpublish") : t("quiz.publish");

  const handleTogglePublish = () =>
    handlePublish({
      quizId: record.id,
      status: isPublished ? "draft" : "published",
    });

  const handleDelete = () => {
    setQuizToDelete(record);
    setIsDeleteAlertOpen(true);
  };

  return (
    <Dropdown
      buttonStyle="text"
      icon={MenuHorizontal}
      position="bottom-end"
      strategy="fixed"
    >
      <Dropdown.Menu>
        <Dropdown.MenuItem.Button onClick={handleTogglePublish}>
          {publishLabel}
        </Dropdown.MenuItem.Button>
        <Dropdown.MenuItem.Button onClick={() => handleClone(record.id)}>
          {t("button.clone")}
        </Dropdown.MenuItem.Button>
        <Dropdown.Divider />
        <Dropdown.MenuItem.Button
          style="danger"
          type="delete"
          onClick={handleDelete}
        >
          {t("button.delete")}
        </Dropdown.MenuItem.Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default withT(ActionDropdown);
