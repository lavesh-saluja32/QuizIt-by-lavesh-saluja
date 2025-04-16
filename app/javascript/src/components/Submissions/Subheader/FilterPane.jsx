import React, { useState } from "react";

import { filterNonNull } from "@bigbinary/neeto-cist";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { Filter } from "@bigbinary/neeto-icons";
import { Form, Select, Input } from "neetoui/formik";
import { Button, Pane, Typography } from "neetoui/index";
import { useTranslation } from "react-i18next";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { routes } from "routes";

const FilterPane = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { quizId } = useParams();
  const history = useHistory();

  const { Header, Body, Footer } = Pane;
  const { t } = useTranslation();
  const handleSubmit = values => {
    const { name, status } = values;

    const params = filterNonNull({
      ...(name?.trim() && { search: name.trim() }),
      status: status?.value,
      quizId,
    });

    history.push(buildUrl(routes.quiz.submissions, params));
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
            initialValues: { name: "" },
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
                    placeholder={t("placeholder.name")}
                    type="name"
                  />
                  <Select
                    className="w-full"
                    label={t("quiz.status")}
                    name="status"
                    placeholder={t("placeholder.selectStatus")}
                    options={[
                      {
                        label: t("button.filter.completed"),
                        value: "completed",
                      },
                      {
                        label: t("button.filter.incomplete"),
                        value: "incomplete",
                      },
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
