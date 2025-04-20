import {
  VayuCommandsActiveIcon,
  VayuCommandsIcon,
  VayuDownloadDataActiveIcon,
  VayuDownloadDataIcon,
  VayuProfileActiveIcon,
  VayuProfileIcon,
  // VayuUserGroupsActiveIcon,
  // VayuUserGroupsIcon,
  VayuUserIcon,
  VayuUserActiveIcon,
  MetersIcon,
  MetersIconActive,
  CommandsIcon,
  CommandsIconActive,
  ExportIcon,
  VayuUserGroupsActiveIcon,
  VayuUserGroupsIcon
} from "../assets/svg/svg";


export const vayuSidebarItems = [
  {
    name: "Meters",
    path: "/meters",
    icon:MetersIcon,
    activeIcon: MetersIconActive,
    key:"Meters"
  },
  {
    name: "Commands",
    path: "/commands",
    icon: CommandsIcon,
    activeIcon: CommandsIconActive,
    key: "Commands"
  },
  {
    name: "Field Users",
    path: "/field_users",
    icon: VayuUserIcon,
    activeIcon: VayuUserActiveIcon,
    key: "Field Users"
  },
  {
    name: "Field User Groups",
    path: "/field_user_groups",
    icon: VayuUserGroupsIcon,
    activeIcon: VayuUserGroupsActiveIcon,
    key: "Field User Groups"
  },
  {
    name: "Download Data",
    path: "/download_data",
    icon: VayuDownloadDataIcon,
    activeIcon: VayuDownloadDataActiveIcon,
    key: "Download Data"
  },
  {
    name: "My Profile",
    path: "/my_profile",
    icon: VayuProfileIcon,
    activeIcon: VayuProfileActiveIcon,
    key: "my_profile"
  },
];
