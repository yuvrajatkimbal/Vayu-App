import { Box, Button, Grid } from "@mui/material";
// import Swipper from "./Swipper";
import { FormEvent, ReactNode } from "react";
import SwipperWrapper from "./SwipperWrapper";
import Logo from "src/components/LogoSign";
import { useTheme } from "@mui/material";
import { RightIcon } from "src/assets/svg/svg";
import MuiCard from "@mui/material/Card";
import styled from "@emotion/styled";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: "36px",
  gap: "18px",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px"
}));

interface MainWrapperProps {
  children: ReactNode;
  label?: string;
  submitHandler?: (event: FormEvent<HTMLFormElement>) => void;
}

const MainWrapper: React.FC<MainWrapperProps> = ({
  children,
  label,
  submitHandler
}) => {
  const theme = useTheme();

  return (
    <>
      <SwipperWrapper>
        <Box
          component="form"
          onSubmit={submitHandler}
          noValidate
          sx={{
            margin: "0px 36px",
            // margin: 6,
            padding: 6,
            // border: '1px solid black',
            minHeight: 100,
            width: "100%"
            // display: 'flex',
            // flexDirection: 'column',
            // justifyContent: 'space-between'
            // alignItems: 'stretch'
          }}
        >
          <Card
            sx={{
              borderRadius: 0,
              border: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: 2,
              padding: "36px"
            }}
            variant="outlined"
          >
            <Box>
              <Box>
                <Logo notClick />
              </Box>
              {children}
            </Box>

            <Box>
              <Button
                type="submit"
                variant="contained"
                // onClick={submitHandler}
                className="filter-button"
                endIcon={<RightIcon />}
                sx={{
                  background: theme.colors.alpha.primary[100],
                  color: theme.colors.alpha.black[100],
                  border: `1px solid ${theme.colors.alpha.black[100]}`,
                  fontSize: "20px",
                  fontWeight: "500",
                  "& .MuiButton-endIcon": {
                    marginLeft: 3 // Adjust the value as needed
                  },
                  mt:2,
                  "& .button-text": {
                    marginRight: 3 // Adjust the value as needed
                  }
                }}
              >
                {label || "Enter"}
              </Button>
            </Box>
          </Card>
        </Box>
      </SwipperWrapper>
    </>
  );
};

export default MainWrapper;
