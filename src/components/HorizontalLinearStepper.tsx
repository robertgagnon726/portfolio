'use client';

import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { Dispatch, Fragment, ReactNode, SetStateAction, useCallback, useState } from 'react';

interface HorizontalLinearStepperProps {
  stepNames: string[];
  stepContent: ReactNode;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  stepperWidth?: number;
  nextDisabled?: boolean;
  primaryActionHandler: () => void;
  primaryActionLabel: string;
  secondaryActionHandler?: () => void;
  secondaryActionLabel?: string;
  nextButtonPreHandler?: () => Promise<void>;
}

/**
 * A component that renders a horizontal linear stepper with customizable steps and actions.
 */
export default function HorizontalLinearStepper({
  stepNames,
  stepContent,
  activeStep,
  setActiveStep,
  nextDisabled = false,
  stepperWidth = 800,
  primaryActionHandler,
  primaryActionLabel,
  secondaryActionHandler,
  secondaryActionLabel,
  nextButtonPreHandler,
}: HorizontalLinearStepperProps) {
  const [loading, setLoading] = useState(false);
  const handleNext = useCallback(async () => {
    try {
      setLoading(true);
      await nextButtonPreHandler?.();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch {
      // Fail silently
    } finally {
      setLoading(false);
    }
  }, [nextButtonPreHandler, setActiveStep]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, [setActiveStep]);

  const handleReset = useCallback(() => {
    setActiveStep(0);
  }, [setActiveStep]);

  return (
    <StyledContainer>
      <StyledStepperContainer>
        <StyledStepper activeStep={activeStep} stepperWidth={stepperWidth}>
          {stepNames.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </StyledStepper>
      </StyledStepperContainer>

      {activeStep === stepNames.length ? (
        <Fragment>
          <StyledStepsCompleted>All steps completed - you&apos;re finished</StyledStepsCompleted>
          <StyledResetContainer>
            <StyledSpacer />
            <Button onClick={handleReset}>Reset</Button>
          </StyledResetContainer>
        </Fragment>
      ) : (
        <Fragment>
          {stepContent}
          <StyledFooterContainer>
            <StyledBackButton color="inherit" disabled={activeStep === 0} onClick={handleBack}>
              Back
            </StyledBackButton>
            <StyledSpacer />
            {activeStep !== stepNames.length - 1 ? (
              <Button onClick={handleNext} disabled={nextDisabled || loading}>
                Next
              </Button>
            ) : (
              <>
                {secondaryActionHandler && secondaryActionLabel && (
                  <Button onClick={secondaryActionHandler} disabled={nextDisabled}>
                    {secondaryActionLabel}
                  </Button>
                )}
                <Button onClick={primaryActionHandler} disabled={nextDisabled}>
                  {primaryActionLabel}
                </Button>
              </>
            )}
          </StyledFooterContainer>
        </Fragment>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  maxWidth: 1200,
}));

const StyledStepper = styled(Stepper, {
  shouldForwardProp: (prop) => prop !== 'stepperWidth',
})<{ stepperWidth: number }>(({ stepperWidth }) => ({
  width: stepperWidth,
}));

const StyledStepperContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

const StyledStepsCompleted = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const StyledResetContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  paddingTop: theme.spacing(2),
}));

const StyledSpacer = styled(Box)(() => ({
  flex: '1 1 auto',
}));

const StyledFooterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  paddingTop: theme.spacing(2),
}));

const StyledBackButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));
