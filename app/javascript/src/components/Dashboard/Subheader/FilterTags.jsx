import React from "react";

import { capitalize } from "@bigbinary/neeto-cist";
import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { Close } from "@bigbinary/neeto-icons";
import { Typography, Button } from "neetoui";
import { Trans } from "react-i18next";

const FilterTags = ({
  search,
  category,
  status = "",
  t,
  handleclearFilter,
  history,
}) => {
  const filters = [
    {
      key: "search",
      labelKey: "subheader.filters.name",
      value: search,
    },
    {
      key: "category",
      labelKey: "subheader.filters.category",
      value: category,
    },
    {
      key: "status",
      labelKey: "subheader.filters.status",
      value: status !== "all" ? capitalize(status) : null,
    },
  ].filter(filter => filter.value);

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
      {filters.map(({ key, labelKey, value }) => (
        <div
          className="flex items-center space-x-2 rounded-lg bg-gray-100 p-1"
          key={key}
        >
          <Typography>
            <Trans
              i18nKey={labelKey}
              values={{ [key]: value }}
              components={{
                span: <span className="text-sm" />,
                strong: <strong className="text-sm" />,
              }}
            />
          </Typography>
          <Button
            icon={Close}
            style="link"
            onClick={() => handleclearFilter(key)}
          />
        </div>
      ))}
      {filters.length > 0 && (
        <Button
          label={t("button.filter.clear")}
          style="secondary"
          onClick={() => history.push("?")}
        />
      )}
    </div>
  );
};

export default withT(FilterTags);
