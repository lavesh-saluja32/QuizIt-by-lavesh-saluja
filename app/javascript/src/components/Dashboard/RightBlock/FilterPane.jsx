import React, { useState } from "react";

import { filterNonNull } from "@bigbinary/neeto-cist";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { Filter } from "@bigbinary/neeto-icons";
import { Form, Select, Input } from "neetoui/formik";
import { Button, Pane, Typography } from "neetoui/index";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { FILTER_INITIAL_VALUES } from "./constant";

import useCategories from "../../../hooks/reactQuery/useFetchCategories";
import { routes } from "../../../routes";

const FilterPane = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: { data: { categories = [] } = {} } = {} } = useCategories();

  const history = useHistory();

  const { Header, Body, Footer } = Pane;
  const { t } = useTranslation();
  const handleSubmit = values => {
    const { name, status, category } = values;

    const params = filterNonNull({
      search: name,
      status: status.value,
      category: category.map(cat => cat.label),
    });

    history.push(buildUrl(routes.root, params));
    setIsOpen(false);
  };

  return (
    <>
      <Button icon={Filter} style="link" onClick={() => setIsOpen(true)} />
      <Pane {...{ isOpen }} onClose={() => setIsOpen(false)}>
        <Header>
          <Typography style="h2">{t("quiz.filters")}</Typography>
        </Header>
        <Form
          formikProps={{
            initialValues: FILTER_INITIAL_VALUES,
            onSubmit: handleSubmit,
          }}
        >
          {({ dirty }) => (
            <>
              <Body>
                <div className="w-full space-y-4">
                  <Input
                    className="w-full"
                    label={t("quiz.name")}
                    name="name"
                    placeholder={t("quiz.placeholder")}
                    type="name"
                  />
                  <Select
                    isMulti
                    isSearchable
                    className="w-full"
                    label={t("quiz.category")}
                    name="category"
                    placeholder={t("placeholder.selectCategory")}
                    options={categories?.map(category => ({
                      label: category.name,
                      value: category.id,
                    }))}
                  />
                  <Select
                    className="w-full"
                    label={t("quiz.status")}
                    name="status"
                    placeholder={t("placeholder.selectStatus")}
                    options={[
                      {
                        label: t("button.filter.published"),
                        value: "published",
                      },
                      { label: t("button.filter.draft"), value: "draft" },
                    ]}
                  />
                </div>
              </Body>
              <Footer>
                <div className="flex space-x-3">
                  <Button
                    className="bg-blue-600"
                    disabled={!dirty}
                    label={t("button.filter.done")}
                    type="submit"
                  />
                  <Button
                    label={t("button.filter.clear")}
                    style="secondary"
                    type="reset"
                  />
                </div>
              </Footer>
            </>
          )}
        </Form>
      </Pane>
    </>
  );
};

export default FilterPane;
