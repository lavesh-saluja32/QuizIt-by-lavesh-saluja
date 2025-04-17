import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

const Inputs = ({ t, disabled }) => (
  <div className="flex w-fit items-center gap-2 bg-white p-1 shadow-sm">
    <Input
      required
      className="custom-input w-[45vw] p-2"
      name="from"
      placeholder={t("placeholder.fromURL")}
      size="large"
      type="text"
    />
    <Input
      required
      className="custom-input w-[25vw] p-2"
      name="to"
      placeholder={t("placeholder.fromURL")}
      size="large"
      type="text"
    />
    <Button
      icon={() => <Check color="green" />}
      style="link"
      type="submit"
      {...{ disabled }}
      className="hover:bg-slate-100"
    />
    <Button
      className="hover:bg-slate-100"
      icon={() => <Close color="red" />}
      style="link"
      type="reset"
    />
  </div>
);

export default withT(Inputs);
