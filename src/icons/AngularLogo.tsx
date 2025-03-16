import { SvgIcon, useTheme } from '@mui/material';

export function AngularLogo({ ...props }) {
  const theme = useTheme();
  return (
    <SvgIcon {...props} viewBox="0 0 128 128">
      <g id="surface1">
        <path
          stroke="none"
          fillRule="nonzero"
          fill={theme.palette.grey[100]}
          fillOpacity="1"
          d="M 64 15.359375 L 16.332031 32.359375 L 23.601562 95.386719 L 64 117.761719 L 104.398438 95.386719 L 111.667969 32.359375 Z M 64 15.359375 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill={theme.palette.grey[200]}
          fillOpacity="1"
          d="M 64 15.359375 L 64 26.726562 L 64 26.675781 L 64 117.761719 L 104.398438 95.386719 L 111.667969 32.359375 Z M 64 15.359375 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill={theme.palette.background.default}
          fillOpacity="1"
          d="M 64 26.675781 L 34.203125 93.492188 L 45.3125 93.492188 L 51.300781 78.539062 L 76.59375 78.539062 L 82.585938 93.492188 L 93.695312 93.492188 Z M 72.703125 69.324219 L 55.296875 69.324219 L 64 48.382812 Z M 72.703125 69.324219 "
        />
      </g>
    </SvgIcon>
  );
}
