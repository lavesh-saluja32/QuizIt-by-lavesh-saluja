import React, { useState } from "react";
import { Dropdown, Typography, Select } from "neetoui";
import { withTranslation } from "react-i18next";
import { Filter } from "neetoicons";
import useFetchCategories from "../../hooks/reactQuery/useFetchCategories";
import { useHistory } from "react-router-dom";
import { useQueryParams } from "@bigbinary/neeto-commons-frontend/react-utils";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { routes } from "../../routes";
const DropdownFilter = ({ t }) => {
  const { data: { data: { categories = [] } = {} } = {} } =
    useFetchCategories();

  const queryParams = useQueryParams();

  const history = useHistory();

  const handleParams = selectedOptions => {
    history.replace(
      buildUrl(routes.public, {
        category: selectedOptions.map(option => option.label),
      })
    );
  };

  return (
    <div>
      <Dropdown
        className="h-15 ml-2 p-2"
        icon={Filter}
        strategy="fixed"
        buttonStyle="link"
      >
        <div onClick={event => event.stopPropagation()}>
          <Select
            isMulti
            isSearchable
            placeholder="Select categories"
            options={categories.map(category => ({
              label: category.name,
              value: category.name,
            }))}
            styles={{
              menu: base => ({
                ...base,
                position: "relative",
                zIndex: 10,
              }),
              menuList: base => ({
                ...base,
                maxHeight: "200px",
              }),
            }}
            value={queryParams.categories?.split(",").map(category => ({
              label: category,
              value: category,
            }))}
            onChange={handleParams}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default withTranslation()(DropdownFilter);
