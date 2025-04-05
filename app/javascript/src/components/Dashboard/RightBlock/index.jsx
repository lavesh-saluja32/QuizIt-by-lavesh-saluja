import React from "react";

import FilterPane from "./FilterPane";
import FilterTableColumn from "./FilterTableColumn";

const RightBlock = ({ selectedColumns, toggleColumn }) => (
  <>
    <FilterPane />
    <FilterTableColumn {...{ selectedColumns, toggleColumn }} />
  </>
);

export default RightBlock;
