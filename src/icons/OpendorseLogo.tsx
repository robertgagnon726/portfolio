import { SvgIcon, useTheme } from '@mui/material';
import { brand } from '@Src/theme/themePrimitives/themePrimitives';
import { useMemo } from 'react';

export function OpendorseLogo({ ...props }) {
  const theme = useTheme();

  const fillColor = useMemo(() => {
    return theme.palette.mode === 'dark' ? brand[400] : brand[600];
  }, []);

  return (
    <SvgIcon {...props} viewBox="0 0 110 92">
      <path
        d="M68.8 7.3 41 .1c-1.9-.5-3.5.7-3.5 2.7v90.7c0 2 1.5 3 3.3 2.3l28-10.5c1.8-.7 3.3-2.8 3.3-4.8V11.7c.2-1.9-1.4-3.9-3.3-4.4M87.1 16.9l19.4-5c1.9-.5 3.4.7 3.4 2.7v67.1c0 2-1.5 3-3.3 2.3L87 76.7c-1.8-.7-3.3-2.8-3.3-4.8V21.4c-.1-2 1.5-4 3.4-4.5M3.4 16.9l19.4-5c1.9-.5 3.5.7 3.5 2.7v67.1c0 2-1.5 3-3.3 2.3L3.3 76.7C1.5 76 0 73.9 0 71.9V21.4c0-2 1.5-4 3.4-4.5"
        fill={fillColor}
      />
    </SvgIcon>
  );
}
