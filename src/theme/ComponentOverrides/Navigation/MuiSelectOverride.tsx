import { Theme, Components } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { forwardRef } from 'react';

export const MuiSelectOverride: Components<Theme> = {
  MuiSelect: {
    defaultProps: {
      // eslint-disable-next-line react/display-name
      IconComponent: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
        <UnfoldMoreRoundedIcon fontSize="small" {...props} ref={ref} />
      )),
      variant: 'outlined',
      size: 'small',
    },
  },
};
