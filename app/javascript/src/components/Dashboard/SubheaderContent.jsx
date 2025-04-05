import React from "react";

import { Typography, Button } from "neetoui";
import { Trans } from "react-i18next";

import { routes } from "../../routes";

const SubHeaderContent = ({
  totalSize,
  search,
  category,
  status,
  history,
  t,
}) => (
  <div className="flex flex-col space-y-1">
    <Typography component="h4" style="h4">
      <Trans i18nKey="subheader.filters.totalSize" values={{ totalSize }} />
    </Typography>
    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
      {search && (
        <Typography>
          <Trans
            components={{ span: <span className="text-gray-300" /> }}
            i18nKey="subheader.filters.name"
            values={{ search }}
          />
        </Typography>
      )}
      {Array.isArray(category) && category.length > 0 && (
        <Typography>
          <Trans
            components={{ span: <span className="text-gray-300" /> }}
            i18nKey="subheader.filters.category"
            values={{ categories: category.join(", ") }}
          />
        </Typography>
      )}
      {status && status !== "all" && (
        <Typography>
          <Trans
            components={{ span: <span className="text-gray-300" /> }}
            i18nKey="subheader.filters.status"
            values={{ status }}
          />
        </Typography>
      )}
      {(status || Array.isArray(category) || search) && (
        <Button
          label={t("button.filter.clear")}
          style="secondary"
          onClick={() => history.push(routes.root)}
        />
      )}
    </div>
  </div>
);

export default SubHeaderContent;
