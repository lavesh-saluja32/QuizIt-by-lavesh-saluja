import React from "react";

import { Download, Column } from "@bigbinary/neeto-icons";

import FilterTableColumn from "./FilterTableColumn";

const RightBlock = () => (
  <div className="flex space-x-3">
    <Download />
    <Column />
    <FilterTableColumn />
  </div>
);

export default RightBlock;
