import React from "react";

import { Download, Filter } from "@bigbinary/neeto-icons";
import { Button } from "neetoui/index";

import FilterTableColumn from "./FilterTableColumn";

const RightBlock = ({ generatePdf }) => (
  <div className="flex space-x-3">
    <Button icon={Download} style="link" onClick={generatePdf} />
    <Filter />
    <FilterTableColumn />
  </div>
);

export default RightBlock;
