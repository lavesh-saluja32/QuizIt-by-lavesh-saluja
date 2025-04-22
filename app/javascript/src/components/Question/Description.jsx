import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import FormikEditor from "@bigbinary/neeto-editor/FormikEditor";

const Description = ({ t, initialValue }) => (
  <FormikEditor
    label={t("labels.description")}
    name="description"
    {...{ initialValue }}
  />
);

export default withT(Description);
