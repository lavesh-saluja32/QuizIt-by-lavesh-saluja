import React from "react";

import { Trans } from "react-i18next";

import BulkActions from "./BulkActions";
import FilterTags from "./FilterTags";

const SubHeader = props => {
  const { totalSize, selectedRows } = props;

  return (
    <div className="flex flex-col space-y-4">
      <div>
        {selectedRows.length > 0 && totalSize !== 0 ? (
          <BulkActions {...props} />
        ) : (
          <Trans
            values={{ totalSize }}
            i18nKey={`subheader.filters.totalSize${
              totalSize <= 1 ? "One" : "Other"
            }`}
          />
        )}
      </div>
      <FilterTags {...props} />
    </div>
  );
};

export default SubHeader;
