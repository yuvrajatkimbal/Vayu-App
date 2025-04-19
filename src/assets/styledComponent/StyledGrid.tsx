import { Grid, GridProps, styled } from '@mui/material';

interface StyledGridProps extends GridProps {
  customBackground?: string;
  borderDirection?:
    | 'right'
    | 'left'
    | 'top'
    | 'bottom'
    | 'none'
    | ('right' | 'left' | 'top' | 'bottom' | 'none')[];
}

// Use shouldForwardProp to filter out custom props
export const StyledGrid = styled(Grid, {
  shouldForwardProp: (prop) =>
    prop !== 'customBackground' && prop !== 'borderDirection'
})<StyledGridProps>(({ theme, customBackground, borderDirection }) => {
  const borderStyles = Array.isArray(borderDirection)
    ? borderDirection.reduce((acc, dir) => {
        if (dir === 'right') acc.borderRight = '1px solid';
        if (dir === 'left') acc.borderLeft = '1px solid';
        if (dir === 'top') acc.borderTop = '1px solid';
        if (dir === 'bottom') acc.borderBottom = '1px solid';
        return acc;
      }, {} as React.CSSProperties)
    : borderDirection === 'right'
    ? { borderRight: '1px solid' }
    : borderDirection === 'left'
    ? { borderLeft: '1px solid' }
    : borderDirection === 'top'
    ? { borderTop: '1px solid' }
    : borderDirection === 'bottom'
    ? { borderBottom: '1px solid' }
    : {};

  return {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    background: customBackground || theme.colors.alpha.nmsSecondary[100],
    ...borderStyles,
    paddingTop: '2px !important',
    paddingLeft: "18px !important",
    paddingRight: "12px !important",
    cursor: 'pointer',
    height: '100px',
    transition: theme.transitions.create(['background', 'border'], {
      duration: theme.transitions.duration.complex
    }),
    '&:hover': {
      '& .icon-wrapper': {
        borderColor: '#000' // Change border color on hover
      },
      '& .icon-wrapper svg': {
        transform: 'rotate(-45deg)'
      }
    }
  };
});
