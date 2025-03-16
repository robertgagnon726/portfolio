import { sendBasicEmail } from '@App/actions/send-basic-email';
import { useAlert } from '@Components/Alert';
import { Form } from '@Components/forms/Form';
import { FormTextField } from '@Components/Inputs/FormTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardContent, Grid2, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';

export function useContactValidation() {
  const t = useTranslations('Contact');

  return {
    firstNameMin: t('valFirstNameMin', { min: 2 }),
    firstNameMax: t('valFirstNameMax', { max: 40 }),
    firstNameRequired: t('valFirstNameRequired'),

    lastNameMin: t('valLastNameMin', { min: 2 }),
    lastNameMax: t('valLastNameMax', { max: 40 }),
    lastNameRequired: t('valLastNameRequired'),

    emailMax: t('valEmailMax', { max: 60 }),
    emailInvalid: t('valEmailInvalid'),
    emailRequired: t('valEmailRequired'),

    subjectMin: t('valSubjectMin', { min: 5 }),
    subjectMax: t('valSubjectMax', { max: 40 }),
    subjectRequired: t('valSubjectRequired'),

    messageMin: t('valMessageMin', { min: 10 }),
    messageMax: t('valMessageMax', { max: 1000 }),
    messageRequired: t('valMessageRequired'),
  };
}

type ContactValidation = ReturnType<typeof useContactValidation>;

type StringField = 'firstName' | 'lastName' | 'subject' | 'message';

function buildStringSchema<TField extends StringField>(
  validation: ContactValidation,
  field: TField,
  min: number,
  max: number,
) {
  return string()
    .min(min, validation[`${field}Min` as `${TField}Min`])
    .max(max, validation[`${field}Max` as `${TField}Max`])
    .required(validation[`${field}Required` as `${TField}Required`]);
}

export function getContactSchema(validation: ContactValidation) {
  return object().shape({
    firstName: string()
      .min(2, validation.firstNameMin)
      .max(40, validation.firstNameMax)
      .required(validation.firstNameRequired),

    lastName: buildStringSchema(validation, 'lastName', 2, 40),
    email: string().max(60, validation.emailMax).email(validation.emailInvalid).required(validation.emailRequired),
    subject: buildStringSchema(validation, 'subject', 5, 40),
    message: buildStringSchema(validation, 'message', 10, 1000),
  });
}

type ContactSchema = ReturnType<typeof getContactSchema>;
export type ContactFormValues = InferType<ContactSchema>;

export const ContactForm = () => {
  const alert = useAlert();
  const validation = useContactValidation();
  const contactT = useTranslations('Contact');
  const alertT = useTranslations('Alert');

  const defaultValues: ContactFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  };

  const methods = useForm<ContactFormValues>({
    resolver: yupResolver(getContactSchema(validation)),
    defaultValues,
  });

  const handleContactSubmit = async (values: ContactFormValues) => {
    const response = await sendBasicEmail(values);

    if (response.success) {
      methods.reset();
      alert.setAlert(alertT('messageSent'), 'success');
    }
  };

  return (
    <Form
      disabled={methods.formState.isSubmitting}
      methods={methods}
      onFormSubmit={handleContactSubmit}
      renderFormContent={() => (
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Grid2 container flexDirection={{ xs: 'column', md: 'row' }} spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <FormTextField name="firstName" label={contactT('firstNameLabel')} size="small" required />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <FormTextField name="lastName" label={contactT('lastNameLabel')} size="small" required />
                </Grid2>
              </Grid2>

              <FormTextField
                name="email"
                label={contactT('emailLabel')}
                size="small"
                type="email"
                autoComplete="email"
                required
              />
              <FormTextField name="subject" label={contactT('subjectLabel')} size="small" required />
              <FormTextField name="message" label={contactT('messageLabel')} size="small" multiline rows={4} required />
              <Button type="submit" variant="outlined" fullWidth loading={methods.formState.isSubmitting}>
                {contactT('sendMessage')}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    />
  );
};
