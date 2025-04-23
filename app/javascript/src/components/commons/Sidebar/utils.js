import { Settings, Globe, List } from "@bigbinary/neeto-icons";
import { routes } from "routes";

export const navItems = [
  { to: routes.admin, icon: List },
  {
    to: routes.settings.general,
    matchPath: routes.settings.root,
    icon: Settings,
  },
  { to: routes.root, icon: Globe },
];
