import React from "react";

import { useQueryParams } from "@bigbinary/neeto-commons-frontend/react-utils";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import useFetchCategories from "hooks/reactQuery/useFetchCategories";
import { Filter } from "neetoicons";
import { Dropdown, Select } from "neetoui";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { routes } from "routes";

const DropdownFilter = () => {
  const { data: { data: { categories = [] } = {} } = {} } =
    useFetchCategories();

  const queryParams = useQueryParams();
  const history = useHistory();

  const handleParams = selectedOptions => {
    history.replace(
      buildUrl(routes.root, {
        category: selectedOptions.map(option => option.label),
      })
    );
  };

  return (
    <div>
      <Dropdown
        buttonStyle="link"
        className="dropdown-filter-container h-full"
        icon={Filter}
        strategy="fixed"
      >
        <div onClick={event => event.stopPropagation()}>
          <Select
            isMulti
            isSearchable
            classNamePrefix="react-select"
            placeholder="Select categories"
            options={categories.map(category => ({
              label: category.name,
              value: category.name,
            }))}
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
