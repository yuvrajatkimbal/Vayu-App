import {
  Box,
  Tooltip,
  Badge,
  TooltipProps,
  tooltipClasses,
  styled,
  useTheme
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ApraavaLogoIcon, KimbalLogoIcon, LogoIcon } from 'src/assets/svg/svg';
import { setPageTitle } from 'src/reducers/common';

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));
interface LogoProps {
  open?: boolean;
  notClick?: boolean;
}

// Logo component
function Logo({ open, notClick }: LogoProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = () => {
    dispatch(setPageTitle('Commands'));
    navigate('/commands');
  };

  return (
    <Box
      onClick={notClick ? null : handleNavigation}
      sx={{ paddingTop: '0.5px'}}
    >
      {open ? <LogoIcon /> : <KimbalLogoIcon />}
    </Box>
  );
}

export default Logo;
