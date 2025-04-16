import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { Input } from "neetoui/formik";

const QuestionInput = ({ t }) => (
  <div>
    <Input
      nakedInput
      className="custom-input border-b p-2"
      contentSize={70}
      name="question"
      placeholder={t("placeholder.question")}
      size="large"
      type="text"
    />
  </div>
);

export default withT(QuestionInput);
