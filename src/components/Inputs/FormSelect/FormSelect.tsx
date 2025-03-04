import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { Controller, useFormContext, FieldValues, Path, ControllerRenderProps } from 'react-hook-form';
import { FormControl, TextField, Tooltip, FormHelperText } from '@mui/material';
import { get } from 'lodash';
import { SyntheticEvent, useCallback } from 'react';
import { Option } from '@Components/Inputs/FormMultiSelect/FormMultiSelect';
import { FormSelectAsyncField } from '@Components/Inputs/FormSelect/FormSelectAsyncField';

// Define the props for the component
export interface FormSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  options?: Option[];
  fetchOptions?: (
    searchQuery: string,
    page: number,
  ) => Promise<{
    data: Option[];
    totalPages: number;
  }>;
  fetchOptionById?: (id: number) => Promise<{ data: Option }>;
  label: string;
  required?: boolean;
  tooltip?: string;
  id?: string;
  disabled?: boolean;
}

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  options,
  fetchOptions,
  fetchOptionById,
  label,
  required,
  tooltip,
  id,
  disabled,
}: FormSelectProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const errorMessage = get(errors, name)?.message;

  const getOptionLabel = useCallback((option: Option) => option.label, []);

  const renderTextFieldInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      return <TextField {...params} label={`${label}${required ? '*' : ''}`} />;
    },
    [label, required],
  );

  const onChange = useCallback(
    (field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>) =>
      (_event: SyntheticEvent<Element, Event>, newValue: Option | null) => {
        field.onChange(newValue ? newValue.value : null);
      },
    [],
  );

  const controllerRenderer = useCallback(
    ({ field }: { field: ControllerRenderProps<TFieldValues, Path<TFieldValues>> }) => {
      if (fetchOptions && fetchOptionById) {
        return (
          <FormSelectAsyncField
            field={field}
            fetchOptions={fetchOptions}
            fetchOptionById={fetchOptionById}
            label={label}
            required={required}
            id={id}
            disabled={disabled}
          />
        );
      } else {
        // Use synchronous options
        const localOptions = options || [];
        const selectedOption = localOptions.find((option) => option.value === field.value) || null;

        return (
          <Autocomplete
            data-testid={`controlled-select-${name}`}
            options={localOptions}
            id={id}
            getOptionLabel={getOptionLabel}
            onChange={onChange(field)}
            value={selectedOption}
            renderInput={renderTextFieldInput}
            disabled={disabled}
          />
        );
      }
    },
    [
      fetchOptions,
      fetchOptionById,
      label,
      required,
      id,
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
