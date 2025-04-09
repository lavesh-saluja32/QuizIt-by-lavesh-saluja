import React from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Button } from "neetoui/index";

import FilterPane from "./FilterPane";
import FilterTableColumn from "./FilterTableColumn";

const RightBlock = ({ generatePdf }) => (
  <div className="flex space-x-3">
    <Button icon={Download} style="link" onClick={generatePdf} />
    <FilterPane />
    <FilterTableColumn />
  </div>
);

export default RightBlock;
