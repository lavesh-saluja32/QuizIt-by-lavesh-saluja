import React from "react";

import { Input } from "neetoui/formik";
import { withTranslation } from "react-i18next";

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

export default withTranslation()(QuestionInput);
