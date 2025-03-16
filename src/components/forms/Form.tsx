// Form.tsx
import { styled } from '@mui/material';
import React from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { AnySchema, InferType } from 'yup';

interface FormProps<T extends AnySchema> {
  methods: UseFormReturn<InferType<T>>;
  onFormSubmit: (data: InferType<T>) => Promise<void>;
  renderFormContent?: () => React.ReactNode;
  disabled: boolean;
  actions?: React.ReactNode;
}

export const Form = <T extends AnySchema>({
  methods,
  onFormSubmit,
  renderFormContent,
  disabled,
  actions,
}: FormProps<T>) => (
  <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onFormSubmit)}>
      <StyledFieldset disabled={disabled}>
        {renderFormContent?.()}
        {actions}
      </StyledFieldset>
    </form>
  </FormProvider>
);

const StyledFieldset = styled('fieldset')(() => ({
  border: 'none',
  padding: 0,
}));
