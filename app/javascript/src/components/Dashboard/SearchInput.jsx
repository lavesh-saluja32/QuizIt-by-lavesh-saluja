import React, { useEffect, useState } from "react";

import { useFuncDebounce } from "@bigbinary/neeto-commons-frontend/react-utils";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { Input } from "neetoui/index";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { routes } from "../../routes";

const QuizSearchInput = ({ searchKey }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState(searchKey);

  const handleSearchNavigation = useFuncDebounce(() => {
    const url = searchTerm
      ? buildUrl(routes.root, { search: searchTerm })
      : routes.root;
    history.replace(url);
  }, 300);

  const handleChange = event => {
    const query = event.target.value.trim();
    setSearchTerm(query);
  };

  useEffect(() => {
    handleSearchNavigation();
  }, [searchTerm]);

  return (
    <Input
      className="w-[15vw]"
      placeholder={t("quiz.search")}
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default QuizSearchInput;
