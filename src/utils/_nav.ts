import {
  NMSDashboard,
  NMSDashboardActive,
  NMSGatewayIcon,
  NMSGatewayIconActive,
  NMSNodesIcon,
  NMSNodesIconActive,
  NMSReportIcon,
  NMSTopologysIcon,
  NMSTopologysIconActive,
  ReportsIconActive,
  VayuCommandsIcon
} from "../assets/svg/svg";


export const vayuSidebarItems = [
  {
    name: "Commands",
    path: "/commands",
    icon: NMSDashboard,
    activeIcon: NMSDashboardActive,
    key: "Commands"
  },
  {
    name: "Field User Groups",
    path: "/field_user_groups",
    icon: NMSNodesIcon,
    activeIcon: NMSNodesIconActive,
    key: "Field User Groups"
  },
  {
    name: "Field Users",
    path: "/field_users",
    icon: NMSGatewayIcon,
    activeIcon: NMSGatewayIconActive,
    key: "Field Users"
  },
  // {
  //   name: 'Maps',
  //   path: '/maps',
  //   activeIcon: NMSMapsActiveIcon,
  //   icon: NMSMapsIcon,
  //   key: 'Maps'
  // },
  {
    name: "My Profile",
    path: "/my_profile",
    icon: NMSTopologysIcon,
    activeIcon: NMSTopologysIconActive,
    key: "my_profile"
  },
  // {
  //   name: 'Network Planning',
  //   path: '/network_planning',
  //   icon: NMSNetworkPlanningIcon,
  //   activeIcon:NMSNetworkPlanningActiveIcon,
  //   key: 'Network Planning'
  // },
  {
    name: "Download Data",
    path: "/download_data",
    icon: NMSReportIcon,
    activeIcon: ReportsIconActive,
    key: "Download Data"
  }
];
