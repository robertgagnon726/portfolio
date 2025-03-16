import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { FieldValues, Path, ControllerRenderProps } from 'react-hook-form';
import { TextField, CircularProgress } from '@mui/material';
import { SyntheticEvent, UIEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Option } from '@Components/Inputs/FormMultiSelect/FormMultiSelect';

interface FormMultiSelectAsyncFieldProps<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  label: string;
  required?: boolean;
  fetchOptions: (
    searchQuery: string,
    page: number,
  ) => Promise<{
    data: Option[];
    totalPages: number;
  }>;
  fetchOptionsByIds: (ids: number[]) => Promise<{ data: Option[] }>;
  disabled?: boolean;
}

export const FormMultiSelectAsyncField = <T extends FieldValues>({
  field,
  label,
  required,
  fetchOptions,
  fetchOptionsByIds,
  disabled,
}: FormMultiSelectAsyncFieldProps<T>) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const [debouncedInputValue] = useDebounce(inputValue, 100);

  // Fetch options based on search query and page number
  const fetchOptionsData = useCallback(
    async (search: string, pageNumber: number) => {
      setLoading(true);
      try {
        const result = await fetchOptions(search, pageNumber);
        setOptions((prevOptions) => {
          const optionsMap = new Map(prevOptions.map((option) => [option.value, option]));
          result.data.forEach((option) => {
            optionsMap.set(option.value, option);
          });
          return Array.from(optionsMap.values());
        });
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [fetchOptions],
  );

  // Fetch selected options by IDs
  const fetchSelectedOptionsByIds = useCallback(async () => {
    if (field.value && field.value.length > 0) {
      setLoading(true);
      try {
        const result = await fetchOptionsByIds(field.value);
        setSelectedOptions(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }, [field.value, fetchOptionsByIds]);

  // Effect to fetch options when debounced input value changes
  useEffect(() => {
    setPage(1);
    fetchOptionsData(debouncedInputValue, 1);
  }, [debouncedInputValue, fetchOptionsData]);

  // Effect to fetch selected options when field value changes
  useEffect(() => {
    fetchSelectedOptionsByIds();
  }, [fetchSelectedOptionsByIds]);

  // Handle infinite scrolling
  const handleScroll = useCallback(
    (event: UIEvent<HTMLUListElement>) => {
      const listboxNode = event.currentTarget;
      if (
        listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 1 &&
        !loading &&
        page < totalPages
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchOptionsData(debouncedInputValue, nextPage);
      }
    },
    [debouncedInputValue, fetchOptionsData, loading, page, totalPages],
  );

  // Combine options and selected options to ensure all selected items are displayed
  const allOptionsMap = new Map<number | string, Option>();
  options.forEach((option) => {
    allOptionsMap.set(option.value, option);
  });
  selectedOptions.forEach((option) => {
    allOptionsMap.set(option.value, option);
  });
  const allOptions = Array.from(allOptionsMap.values());

  // Determine the selected options based on field value
  const value = useMemo(
    () => allOptions.filter((option) => field.value.includes(option.value)),
    [field.value, allOptions],
  );

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        label={`${label}${required ? '*' : ''}`}
        disabled={disabled}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
      />
    ),
    [label, required, loading, disabled],
  );

  const onInputChange = useCallback(
    (event: SyntheticEvent, newInputValue: string) => {
      if (event && event.type === 'change') {
        setInputValue(newInputValue);
      }
    },
    [setInputValue],
  );

  const onChange = useCallback(
    (_event: SyntheticEvent, newValue: Option[]) => {
      field.onChange(newValue.map((option) => option.value));
    },
    [field],
  );

  const getOptionKey = useCallback((option: Option) => option.value, []);
  const getOptionLabel = useCallback((option: Option) => option.label, []);

  return (
    <Autocomplete
      data-testid={`controlled-select-${field.name}`}
      multiple
      options={allOptions}
      getOptionLabel={getOptionLabel}
      inputValue={inputValue}
      onInputChange={onInputChange}
      onChange={onChange}
      value={value}
      loading={loading}
      getOptionKey={getOptionKey}
      renderInput={renderInput}
      ListboxProps={{
        onScroll: handleScroll,
      }}
      disabled={disabled}
    />
  );
};
