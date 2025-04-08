import React from "react";

import SubHeader from "@bigbinary/neeto-molecules/SubHeader";

import LeftBlock from "./LeftBlock";
import RightBlock from "./RightBlock";

const Subheader = () => (
  <SubHeader
    className="bg-slate-100"
    leftActionBlock={<LeftBlock />}
    rightActionBlock={<RightBlock />}
  />
);

export default Subheader;
