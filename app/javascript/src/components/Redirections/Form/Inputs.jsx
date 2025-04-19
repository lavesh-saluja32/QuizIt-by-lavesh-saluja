import React, { useState } from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import classnames from "classnames";
import { useFormikContext } from "formik";
import { Check, Close } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Input } from "neetoui/formik";

import ActionDropdown from "./ActionDropdown";

import { getFromUrl, getToUrl } from "../utils";

const Inputs = ({
  t,
  disabled,
  isPending,
  handleEdit,
  handleDelete,
  handleRemove,
  id: redirectionId,
}) => {
  const [previewToURL, setPreviewToURL] = useState("");

  const [isInvalidURL, setIsInvalidURL] = useState(false);

  const { setFieldValue, values } = useFormikContext();
  const handleFromChange = ({ target: { value } }) => {
    const { fullUrl, isValid } = getFromUrl(value);

    setIsInvalidURL(!isValid);
    setFieldValue("from", isValid ? fullUrl : value);
  };

  const handleToChange = ({ target: { value } }) => {
    const { fullUrl, isValid } = getToUrl(value);

    setFieldValue("to", value);
    setPreviewToURL(!value || !isValid ? "" : fullUrl);
  };

  const handleRedirectionEdit = () => {
    handleEdit(redirectionId, values);
    setPreviewToURL("");
  };

  return (
    <div className="flex w-fit items-center gap-2 rounded bg-white p-2 shadow-sm">
      <div>
        <Input
          required
          name="from"
          placeholder={t("placeholder.fromURL")}
          size="large"
          type="text"
          className={classnames("custom-input w-[45vw] p-2", {
            "border border-red-500": isInvalidURL,
          })}
          onChange={handleFromChange}
        />
        {isInvalidURL && (
          <Typography className="pt-1 text-red-500" style="nano">
            {t("validation.url")}
          </Typography>
        )}
      </div>
      <div>
        <Input
          required
          className="custom-input w-[25vw] p-2"
          name="to"
          placeholder={t("placeholder.toURL")}
          size="large"
          type="text"
          onChange={handleToChange}
        />
        {previewToURL && (
          <Typography className="mt-1 text-xs text-gray-600">
            <span className="font-medium text-gray-500">
              {t("button.preview")}
            </span>{" "}
            {previewToURL}
          </Typography>
        )}
      </div>
      {!redirectionId ? (
        <div>
          <Button
            className="hover:bg-slate-100"
            disabled={disabled || isInvalidURL}
            icon={() => <Check color="green" />}
            isLoading={isPending}
            style="link"
            type="submit"
            onMouseDown={event => event.preventDefault()}
          />
          <Button
            className="hover:bg-slate-100"
            icon={() => <Close color="red" />}
            style="link"
            onClick={handleRemove}
            onMouseDown={event => event.preventDefault()}
          />
        </div>
      ) : (
        <ActionDropdown
          {...{
            handleEdit: handleRedirectionEdit,
            handleDelete: () => handleDelete(redirectionId),
            disabled,
          }}
        />
      )}
    </div>
  );
};

export default withT(Inputs);
