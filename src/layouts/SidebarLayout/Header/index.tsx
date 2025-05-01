import { useContext, useState } from "react";
import {
  Box,
  useTheme,
  Typography,
  Grid,
  FormControl,
  useMediaQuery
} from "@mui/material";
import { SidebarContext } from "src/contexts/SidebarContext";
import { useSelector } from "react-redux";
import HeaderButtons from "./Buttons";
import ProjectFilter from "src/components/ProjectFilter";
import {
  ProjectSelect,
  ProjectSelectIcon,
  ProjectMenuItem
} from "src/components/CustomSelectMenu";
import { hasPermission } from "src/utils/permission";
import { profilesEnum, profilesTitleEnum } from "src/utils/enums";
import { getLocalStorage, setLocalStorage } from "src/utils/helper";
import { useNavigate } from "react-router";

function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { permission } = useSelector((state: any) => state.accessManagement);
  const { moduleListByRole } = useSelector((state: any) => state.auth);
  let projectList = getLocalStorage("projectList");
  const [selectedProject, setSelectedProject] = useState(() => {
    return getLocalStorage("project") || '""';
  });

  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const { pageTitle } = useSelector((state: any) => state.common);
  const { subTitle } = useSelector((state: any) => state.common);
  const { subTitle1 } = useSelector((state: any) => state.common);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const typographyStyles = {
    marginLeft: {
      xs: "50px !important",
      md: "50px !important",
      lg: "15px !important",
      xl: "15px !important"
    }
  };
  if (pageTitle) setLocalStorage("title", pageTitle);

  const [anchorEl, setAnchorEl] = useState(null);

  const projectFilterHandler = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  // Map profile enums to profile titles
  const getProfileTitle = (profile) => {
    const profileTitleMap = {
      [profilesEnum.ESWPUSHDATA]: profilesTitleEnum.ESWPUSHDATA,
      [profilesEnum.INSTANTPROFILE]: profilesTitleEnum.INSTANTPROFILE,
      [profilesEnum.BLOCKLOADPROFILE]: profilesTitleEnum.BLOCKLOADPROFILE,
      [profilesEnum.DAILYLOADPROFILE]: profilesTitleEnum.DAILYLOADPROFILE,
      [profilesEnum.EVENTLOG]: profilesTitleEnum.EVENTLOG,
      [profilesEnum.RAWDATA]: profilesTitleEnum.RAWDATA,
      [profilesEnum.BILLINGPROFILE]: profilesTitleEnum.BILLINGPROFILE
    };

    return profileTitleMap[profile] || "";
  };

  const handleProjectChange = (event) => {
    const value = event.target.value;
    setSelectedProject(value);
    setLocalStorage("project", value);
    navigate("/");
    window.location.reload();
  };

  // console.log(pageTitle, subTitle, subTitle1, "pageTitle, subTitle, subTitle1");
  // console.log(getLocalStorage("title"), "title");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: "strech",
        width: "100%",
        height: "75px"
      }}
    >
      {/* Left Section: Title and Subtitles */}
      <Box
        px={3}
        sx={{
          flex: isMobile ? "1 0 auto" : "1 0 65%",
          display: "flex",
          alignItems: "center",
          borderRight: isMobile ? "none" : "1px solid black"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Typography variant="h1" className="f-25" color={"text.primary"}>
            {pageTitle || getLocalStorage("title")}
          </Typography>

          {subTitle && (
            <Typography variant="h1" sx={typographyStyles} className="f-25">
              {">"} {subTitle}
            </Typography>
          )}

          {subTitle1 && (
            <Typography variant="h1" sx={typographyStyles} className="f-25">
              {">"}&nbsp;{getProfileTitle(subTitle1)}
            </Typography>
          )}
        </Box>
        <Box>
          <HeaderButtons />
        </Box>
      </Box>

      {!isMobile &&
        hasPermission(
          moduleListByRole,
          permission?.Meters_Filters_Project_SAT_Advanced
        ) && (
          <Box
            sx={{
              flex: isMobile ? "1 0 auto" : "1 0 25%",
              display: "flex",
              justifyContent: "center",
              padding: "0",
              alignItems: "center",
              borderRight: isMobile ? "none" : "1px solid black"
            }}
            onClick={projectFilterHandler}
          >
            <FormControl fullWidth>
              <ProjectSelect
                value={selectedProject}
                onChange={handleProjectChange}
                IconComponent={ProjectSelectIcon}
                defaultValue={getLocalStorage("project") || "null"}
                displayEmpty
                sx={{ border: "0px solid", backgroundColor: "transparent" }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      marginTop: "1px",
                      padding: "0",
                      maxHeight: 200,
                      borderRadius: "0px",
                      boxShadow: "none"
                    }
                  },
                  MenuListProps: {
                    style: {
                      marginTop: "1px",
                      padding: "0px",
                      maxHeight: 400,
                      overflowY: "auto"
                    }
                  }
                }}
                renderValue={(selected) =>
                  !selected ? (
                    <Typography color="text.secondary"></Typography>
                  ) : (
                    selected
                  )
                }
              >
                {projectList?.split(",")?.map((project) => (
                  <ProjectMenuItem key={project} value={project}>
                    {project}
                  </ProjectMenuItem>
                ))}
              </ProjectSelect>
            </FormControl>
          </Box>
        )}
      
      {/* {      !isMobile && (
        <Box
          sx={{
            flex: isMobile ? '1 0 auto' : '1 0 10%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            // borderLeft: isMobile ? 'none' : '1px solid black'
          }}
        >
          <Typography className='f-18'>Client Logo</Typography>
        </Box>
      )} */}
    </Box>
  );
}

export default Header;
