import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { Controller, useFormContext, FieldValues, Path, ControllerRenderProps } from 'react-hook-form';
import { FormControl, TextField, FormHelperText } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { get } from 'lodash';
import { SyntheticEvent, useCallback } from 'react';
import { FormMultiSelectAsyncField } from '@Components/Inputs/FormMultiSelect/FormMultiSelectAsyncField';

export interface Option {
  value: number | string;
  label: string;
}

// Define the props for the component
export interface FormMultiSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  options?: Option[];
  fetchOptions?: (
    searchQuery: string,
    page: number,
  ) => Promise<{
    data: Option[];
    totalPages: number;
  }>;
  fetchOptionsByIds?: (ids: number[]) => Promise<{ data: Option[] }>;
  label: string;
  required?: boolean;
  tooltip?: string;
  disabled?: boolean;
}

export function FormMultiSelect<TFieldValues extends FieldValues>({
  name,
  options,
  fetchOptions,
  fetchOptionsByIds,
  label,
  required,
  tooltip,
  disabled,
}: FormMultiSelectProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const errorMessage = get(errors, name)?.message;

  const renderTextFieldInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      return <TextField {...params} label={`${label}${required ? '*' : ''}`} disabled={disabled} />;
    },
    [label, required, disabled],
  );

  const onChange = useCallback(
    (field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>) =>
      (_event: SyntheticEvent, newValue: Option[]) => {
        field.onChange(newValue.map((option) => option.value));
      },
    [],
  );

  const getOptionLabel = useCallback((option: Option) => option.label, []);

  const controllerRenderer = useCallback(
    ({ field }: { field: ControllerRenderProps<TFieldValues, Path<TFieldValues>> }) => {
      if (fetchOptions && fetchOptionsByIds) {
        return (
          <FormMultiSelectAsyncField
            field={field}
            fetchOptions={fetchOptions}
            fetchOptionsByIds={fetchOptionsByIds}
            label={label}
            required={required}
            disabled={disabled}
          />
        );
      } else {
        const localOptions = options || [];
        const selectedOptions = localOptions.filter((option) => field.value.includes(option.value));

        return (
          <Autocomplete
            data-testid={`controlled-select-${name}`}
            multiple
            options={localOptions}
            getOptionLabel={getOptionLabel}
            onChange={onChange(field)}
            value={selectedOptions}
            renderInput={renderTextFieldInput}
            disabled={disabled}
          />
        );
      }
    },
    [
      fetchOptions,
      fetchOptionsByIds,
      label,
      required,
      options,
      name,
      getOptionLabel,
      onChange,
      renderTextFieldInput,
      disabled,
    ],
  );

  return (
    <FormControl sx={{ width: '100%' }} error={Boolean(errorMessage)}>
      <Tooltip title={tooltip || ''} arrow enterDelay={2000} leaveDelay={200} placement="top" enterNextDelay={2000}>
        <>
          <Controller control={control} name={name} render={controllerRenderer} />
          {Boolean(errorMessage) && (
            <FormHelperText>{typeof errorMessage === 'string' ? errorMessage : undefined}</FormHelperText>
          )}
        </>
      </Tooltip>
    </FormControl>
  );
}
