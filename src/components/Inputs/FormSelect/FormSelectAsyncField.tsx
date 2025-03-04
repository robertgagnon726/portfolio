import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { FieldValues, Path, ControllerRenderProps } from 'react-hook-form';
import { TextField, CircularProgress } from '@mui/material';
import { SyntheticEvent, UIEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Option } from '@Components/Inputs/FormMultiSelect/FormMultiSelect';

interface FormSelectAsyncFieldProps<TFieldValues extends FieldValues> {
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
  fetchOptionById: (id: number) => Promise<{ data: Option }>;
  id?: string;
  onChangeOverride?: (...event: unknown[]) => void;
  disabled?: boolean;
}

export const FormSelectAsyncField = <T extends FieldValues>({
  field,
  label,
  required,
  fetchOptions,
  fetchOptionById,
  onChangeOverride,
  id,
  disabled,
}: FormSelectAsyncFieldProps<T>) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const [debouncedInputValue] = useDebounce(inputValue, 100);

  // Fetch options based on search query and page number
  const fetchOptionsData = useCallback(
    async (search: string, pageNumber: number) => {
      setLoading(true);
      try {
        const result = await fetchOptions(search, pageNumber);
        if (!result.data) {
          return;
        }
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

  const fetchSelectedOptionById = useCallback(async () => {
    if (field.value !== null && field.value !== '') {
      setLoading(true);
      try {
        if (field.value === 0) return;
        const result = await fetchOptionById(field.value);
        setSelectedOption(result.data);
        setInputValue(result.data.label);
      } catch (error) {
        setSelectedOption(null);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }, [fetchOptionById, field.value]);

  // Effect to fetch options when debounced input value changes
  useEffect(() => {
    setPage(1);
    fetchOptionsData(debouncedInputValue, 1);
  }, [debouncedInputValue, fetchOptionsData]);

  // Effect to fetch selected option when field value changes
  useEffect(() => {
    fetchSelectedOptionById();
  }, [fetchSelectedOptionById]);

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

  // Combine options and selected option to ensure selected item is displayed
  const allOptionsMap = new Map<number | string, Option>();

  options.forEach((option) => {
    if (option?.value !== undefined) {
      allOptionsMap.set(option.value, option);
    }
  });

  if (selectedOption?.value !== undefined) {
    allOptionsMap.set(selectedOption.value, selectedOption);
  }

  const allOptions = Array.from(allOptionsMap.values());

  // Determine the selected option based on field value
  const value = useMemo(
    () => allOptions.find((option) => option.value === field.value) || null,
    [field.value, allOptions],
  );

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      return (
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
      );
    },
    [disabled, label, loading, required],
  );

  const onInputChange = useCallback((event: SyntheticEvent<Element, Event>, newInputValue: string) => {
    if (event && event.type === 'change') {
      setInputValue(newInputValue);
    }
  }, []);

  const onChange = useCallback(
    (event: SyntheticEvent<Element, Event>, newValue: Option | null) => {
      if (event && ['change', 'click'].includes(event.type)) {
        if (onChangeOverride) {
          onChangeOverride(newValue ? (newValue.value as T[Path<T>]) : null);
        } else {
          field.onChange(newValue ? newValue.value : null);
          setInputValue(newValue ? newValue.label : '');
        }
      }
    },
    [field, onChangeOverride],
  );

  const getOptionKey = useCallback((option: Option) => option.value ?? -1, []);
  const getOptionLabel = useCallback((option: Option) => option.label, []);

  return (
    <Autocomplete
      data-testid={`controlled-select-${field.name}`}
      options={allOptions}
      getOptionLabel={getOptionLabel}
      id={id}
      getOptionKey={getOptionKey}
      inputValue={inputValue}
      onInputChange={onInputChange}
      onChange={onChange}
      value={value}
      loading={loading}
      disabled={disabled}
      renderInput={renderInput}
      ListboxProps={{
        onScroll: handleScroll,
      }}
    />
  );
};
