import React from "react";

import SubHeader from "@bigbinary/neeto-molecules/SubHeader";

import LeftBlock from "./LeftBlock";
import RightBlock from "./RightBlock";

const Subheader = ({ generatePdf, submissionsCount }) => (
  <SubHeader
    className="bg-slate-100"
    leftActionBlock={<LeftBlock {...{ submissionsCount }} />}
    rightActionBlock={<RightBlock {...{ generatePdf }} />}
  />
);

export default Subheader;
