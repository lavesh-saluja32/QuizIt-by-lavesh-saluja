import React, { useEffect, useState } from "react";

import { useFuncDebounce } from "@bigbinary/neeto-commons-frontend/react-utils";
import useQueryParams from "@bigbinary/neeto-commons-frontend/react-utils/useQueryParams";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { Input } from "neetoui/index";
import { mergeLeft, omit } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const QuizSearchInput = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const queryParams = useQueryParams();
  const [searchTerm, setSearchTerm] = useState(queryParams.search || "");

  const handleSearchNavigation = useFuncDebounce(() => {
    const pathname = window.location.pathname;

    // Remove `search` from URL if empty, otherwise update it
    const updatedParams = searchTerm
      ? mergeLeft({ search: searchTerm }, queryParams)
      : omit(["search"], queryParams);
    history.push(buildUrl(pathname, updatedParams));
  }, 300);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    handleSearchNavigation();
  }, [searchTerm]);

  return (
    <Input
      clearable
      className="w-[15vw]"
      placeholder={t("quiz.search")}
      value={searchTerm}
      onChange={handleChange}
      onClear={() => setSearchTerm("")} // Clears input on clicking "X"
    />
  );
};

export default QuizSearchInput;
