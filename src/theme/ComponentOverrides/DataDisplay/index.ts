import { MuiChipOverride } from '@Src/theme/ComponentOverrides/DataDisplay/MuiChipOverride';
import { MuiIconOverride } from '@Src/theme/ComponentOverrides/DataDisplay/MuiIconOverride';
import { MuiListItemIconOverride } from '@Src/theme/ComponentOverrides/DataDisplay/MuiListItemIconOverride';
import { MuiListItemOverride } from '@Src/theme/ComponentOverrides/DataDisplay/MuiListItemOverride';
import { MuiListItemTextOverride } from '@Src/theme/ComponentOverrides/DataDisplay/MuiListItemTextOverride';
import { MuiListOverride } from '@Src/theme/ComponentOverrides/DataDisplay/MuiListOverride';
import { MuiListSubheaderOverride } from '@Src/theme/ComponentOverrides/DataDisplay/MuiListSubheaderOverride';
import { MuiTablePaginationOverride } from '@Src/theme/ComponentOverrides/DataDisplay/MuiTablePaginationOverride';

export const DataDisplayComponents = {
  ...MuiChipOverride,
  ...MuiIconOverride,
  ...MuiListItemIconOverride,
  ...MuiListItemOverride,
  ...MuiListItemTextOverride,
  ...MuiListOverride,
  ...MuiListSubheaderOverride,
  ...MuiTablePaginationOverride,
};
