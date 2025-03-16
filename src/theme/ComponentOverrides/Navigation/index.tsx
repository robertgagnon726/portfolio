import { MuiDrawerOverride } from '@Src/theme/ComponentOverrides/Navigation/MuiDrawerOverride';
import { MuiLinkOverride } from '@Src/theme/ComponentOverrides/Navigation/MuiLinkOverride';
import { MuiMenuItemOverride } from '@Src/theme/ComponentOverrides/Navigation/MuiMenuItemOverride';
import { MuiMenuOverride } from '@Src/theme/ComponentOverrides/Navigation/MuiMenuOverride';
import { MuiPaginationItemOverride } from '@Src/theme/ComponentOverrides/Navigation/MuiPaginationItemOverride';
import { MuiSelectOverride } from '@Src/theme/ComponentOverrides/Navigation/MuiSelectOverride';
import { MuiStepConnectorOverride } from '@Src/theme/ComponentOverrides/Navigation/MuiStepConnectorOverride';
import { MuiStepIconOverride } from '@Src/theme/ComponentOverrides/Navigation/MuiStepIconOverride';
import { MuiStepLabelOverride } from '@Src/theme/ComponentOverrides/Navigation/MuiStepLabelOverride';
import { MuiTabOverride } from '@Src/theme/ComponentOverrides/Navigation/MuiTabOverride';
import { MuiTabsOverride } from '@Src/theme/ComponentOverrides/Navigation/MuiTabsOverride';

export const NavigationComponents = {
  ...MuiDrawerOverride,
  ...MuiLinkOverride,
  ...MuiMenuItemOverride,
  ...MuiMenuOverride,
  ...MuiPaginationItemOverride,
  ...MuiSelectOverride,
  ...MuiStepConnectorOverride,
  ...MuiStepIconOverride,
  ...MuiStepLabelOverride,
  ...MuiTabOverride,
  ...MuiTabsOverride,
};
