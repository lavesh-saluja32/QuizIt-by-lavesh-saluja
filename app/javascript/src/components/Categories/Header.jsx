import React, { useState } from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui/index";

import AddCategoryModal from "./AddCategoryModal";

const Header = ({ t, categoriesCount, editCategoryId, setEditCategoryId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-[20vh] w-full p-20">
      <Typography style="h1">{t("headers.settings.categories")}</Typography>
      <Typography style="body2">
        {t("subheader.settings.categories")}
      </Typography>
      <div className="mt-7 flex w-full items-center justify-between">
        <Typography style="h4">
          {t(
            `subheader.settings.${
              categoriesCount <= 1 ? "oneCategory" : "otherCategories"
            }`,
            { count: categoriesCount }
          )}
        </Typography>
        <Button
          icon={Plus}
          iconPosition="left"
          label={t("button.addCategory")}
          style="link"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <AddCategoryModal
        {...{ isModalOpen, setIsModalOpen, editCategoryId, setEditCategoryId }}
      />
    </div>
  );
};
export default withT(Header);
