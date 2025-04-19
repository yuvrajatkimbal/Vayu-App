import { alpha, darken, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const MenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {
      padding: 0;
      & > .MuiList-root {
        padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
      }
    }
    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(17)};
      color: ${theme.colors.alpha.black[50]};
      padding: ${theme.spacing(0, 2.5)};
    }
    &.settings-menu {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 290px;
      background: ${darken(theme.colors.alpha.primary[100], 0.1)};
    }
    .icons {
      padding-right: ${theme.spacing(2.33)};
      padding-top: ${theme.spacing(0.44)};
    }
  `
);

export const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {
      .MuiListItem-root {
        padding: 0;
        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};
          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
        .MuiButton-root {
          display: flex;
          // border-bottom: 1px solid ${theme.colors.alpha.black[100]};
          font-size: ${theme.typography.pxToRem(17)};
          font-weight: 400 !important;
          color: black;
          background-color: #fff;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.5, 0, 1.5, 2.9)};
          .MuiButton-startIcon, .MuiButton-endIcon {
            transition: ${theme.transitions.create('color')};
            .MuiSvgIcon-root {
              font-size: inherit;
            }
          }
          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-right: ${theme.spacing(2.8)};
          }
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: 0.8;
          }
          &.active {
            background-color: ${alpha(theme.colors.alpha.nmsPrimary[100], 0.5)} !important;
            color: ${theme.colors.alpha.nmsPrimaryAlt[100]};
            border-right: 5px solid ${theme.colors.alpha.nmsPrimaryAlt[100]};
            z-index: 999999;
            font-weight: 500 !important;
            .MuiButton-startIcon, .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
          &.active:hover {
            color: ${theme.colors.alpha.nmsPrimaryAlt[100]};
            }
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.1)};
            color: ${theme.colors.alpha.black[100]};
            .MuiButton-startIcon, .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
          &:focus {
           background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.5)};
          }
        }
        &.Mui-children {
          flex-direction: column;
          .MuiBadge-root {
            right: ${theme.spacing(7)};
          }
        }
        .MuiCollapse-root {
          width: 100%;
          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }
          .MuiListItem-root {
            padding: 1px 0;
            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};
              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }
              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }
              &.active, &:hover {
                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
  `
);
