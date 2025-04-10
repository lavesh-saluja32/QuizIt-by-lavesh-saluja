import React, { useState } from "react";
import { Dropdown, Typography, Select } from "neetoui";
import { withTranslation } from "react-i18next";
import { Filter } from "neetoicons";
import useFetchCategories from "../../hooks/reactQuery/useFetchCategories";

const DropdownFilter = ({ t }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { data: { data: { categories = [] } = {} } = {} } =
    useFetchCategories();

  console.log(categories);

  const handleParams = selectedOptions => {
    const categoryParams = selectedOptions.map(option => option.value);
    console.log("Selected category params:", categoryParams);
  };

  const handleCategoryChange = selectedOptions => {
    setSelectedCategories(selectedOptions);
    handleParams(selectedOptions);
  };

  return (
    <div>
      <Select
        isMulti
        isSearchable
        name="categories"
        options={categories.map(category => ({
          label: category.name,
          value: category.id,
        }))}
        strategy="fixed"
        closeOnSelect={false}
      />
      <Dropdown
        buttonStyle="link"
        icon={Filter}
        className="p-3"
        closeOnSelect={false}
      >
        <Dropdown.Menu className="space-y-3">
          <Dropdown.MenuItem>
            <Typography style="h3">{t("quiz.category")}</Typography>
          </Dropdown.MenuItem>
          <Select
            isMulti
            isSearchable
            name="categories"
            options={categories.map(category => ({
              label: category.name,
              value: category.id,
            }))}
            strategy="fixed"
            closeOnSelect={false}
          />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default withTranslation()(DropdownFilter);
