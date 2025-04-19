import React from "react";

import SettingsPageHeader from "components/commons/SettingsPageHeader";

import Form from "./Form";
import Header from "./Header";

const Redirections = () => (
  <div className="h-full w-full overflow-y-scroll bg-slate-100 pb-16">
    <SettingsPageHeader />
    <Header />
    <Form />
  </div>
);
export default Redirections;
