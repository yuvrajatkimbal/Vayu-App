import { FC, ReactNode } from 'react';
import { Scrollbar as RSCScrollbar } from 'react-scrollbars-custom';
import { Box, useTheme } from '@mui/material';

interface ScrollbarProps {
  className?: string;
  children?: ReactNode;
}

const Scrollbar: FC<ScrollbarProps> = ({ className, children }) => {
  const theme = useTheme();

  return (
    <RSCScrollbar
      className={className}
      style={{ height: '100%', width: '100%' }}
      trackYProps={{
        renderer: ({ elementRef, style, ...restProps }) => (
          <div
            ref={elementRef}
            style={{
              ...style,
              position: 'absolute',
              width: '6px',
              right: '2px',
              top: 0,
              bottom: 0,
              borderRadius: theme.general.borderRadiusLg,
              backgroundColor: theme.colors.alpha.black[10],
              transition: theme.transitions.create(['background']),
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor =
                theme.colors.alpha.black[30];
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor =
                theme.colors.alpha.black[10];
            }}
            {...restProps}
          />
        ),
      }}
    >
      {children}
    </RSCScrollbar>
  );
};

export default Scrollbar;
