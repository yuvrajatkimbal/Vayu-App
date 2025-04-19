import React from "react";
import { Chip } from "@mui/material";
import { WarningRounded } from "@mui/icons-material";

const SeverityLabel = ({ severity, showIcon = true }) => {
  return (
    <Chip
      label={severity}
      deleteIcon={
        showIcon ? (
          <WarningRounded
            style={{
              padding: 0,
              color:
                severity.toLowerCase().includes("high") ||
                severity.toLowerCase().includes("fatal") ||
                severity.toLowerCase().includes("error")
                  ? "#b71c1c"
                  : severity.toLowerCase().includes("medium") ||
                    severity.toLowerCase().includes("warning")
                  ? "#ff8f00"
                  : severity.toLowerCase().includes("low") ||
                    severity.toLowerCase().includes("success") ||
                    severity.toLowerCase().includes("info")
                  ? "#388e3c"
                  : "#000000",
              fontSize: "16px"
            }}
          />
        ) : null
      }
      onDelete={showIcon ? () => {} : undefined}
      sx={{
        backgroundColor:
          severity.toLowerCase().includes("high") ||
          severity.toLowerCase().includes("fatal") ||
          severity.toLowerCase().includes("error")
            ? "#ffebee"
            : severity.toLowerCase().includes("medium") ||
              severity.toLowerCase().includes("warning") 
            ? "#fff8e1"
            : severity.toLowerCase().includes("low") ||
              severity.toLowerCase().includes("success") ||
              severity.toLowerCase().includes("info")
            ? "#e8f5e9"
            : "#f5f5f5",

        color:
          severity.toLowerCase().includes("high") ||
          severity.toLowerCase().includes("fatal") ||
          severity.toLowerCase().includes("error")
            ? "#b71c1c"
            : severity.toLowerCase().includes("medium") ||
              severity.toLowerCase().includes("warning")
            ? "#ff8f00"
            : severity.toLowerCase().includes("low") ||
              severity.toLowerCase().includes("success") ||
              severity.toLowerCase().includes("info")
            ? "#388e3c"
            : "#000000",

        border: `1px solid ${
          severity.toLowerCase().includes("high") ||
          severity.toLowerCase().includes("fatal") ||
          severity.toLowerCase().includes("error")
            ? "#b71c1c"
            : severity.toLowerCase().includes("medium") ||
              severity.toLowerCase().includes("warning")
            ? "#ff8f00"
            : severity.toLowerCase().includes("low") ||
              severity.toLowerCase().includes("success") ||
              severity.toLowerCase().includes("info")
            ? "#388e3c"
            : "#bdbdbd"
        }`,

        fontWeight: "bold",
        borderRadius: "16px",
        padding: "1px 1px",
        minWidth: "80px",
        height: "24px",
        "& .MuiChip-label": {
          padding: "0px 4px",
          fontSize: "14px"
        },
        "& .MuiChip-deleteIcon": {
          marginLeft: "4px",
          fontSize: "18px"
        }
      }}
    />
  );
};

export default SeverityLabel;
