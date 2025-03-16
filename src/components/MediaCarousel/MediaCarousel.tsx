import { ArrowBackIosNew, ArrowForwardIos, Close, FiberManualRecord } from '@mui/icons-material';
import { Box, Dialog, DialogActions, IconButton, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SlideMedia } from '@Components/MediaCarousel/SlideMedia';

interface MediaCarouselProps {
  mediaUrls: string[];
  handleClose: () => void;
}

export const MediaCarousel = ({ mediaUrls, handleClose }: MediaCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const dialogOpen = mediaUrls.length > 0;
  const [slideKey, setSlideKey] = useState(0);

  const handleNext = () => {
    setDirection('next');
    setSlideKey((prev) => prev + 1);
    setCurrentIndex((prev) => (prev + 1) % mediaUrls.length);
  };

  // Go to previous image
  const handlePrev = () => {
    setDirection('prev');
    setSlideKey((prev) => prev + 1);
    setCurrentIndex((prev) => (prev - 1 + mediaUrls.length) % mediaUrls.length);
  };

  const currentImage = mediaUrls[currentIndex] ?? '';

  const imagesCloseHandler = () => {
    setCurrentIndex(0);
    handleClose();
  };

  useEffect(() => {
    if (!dialogOpen) return; // Stop if closed

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dialogOpen]);

  return (
    <StyledDialog open={mediaUrls.length > 0} onClose={imagesCloseHandler} fullScreen>
      <StyledDialogActions>
        <IconButton onClick={imagesCloseHandler}>
          <Close />
        </IconButton>
      </StyledDialogActions>
      <StyledImageContainer>
        {mediaUrls.length > 1 && (
          <StyledPreviousIconButton onClick={handlePrev}>
            <ArrowBackIosNew />
          </StyledPreviousIconButton>
        )}
        <AnimatePresence mode="wait">
          <SlideMedia
            handlePrev={handlePrev}
            handleNext={handleNext}
            key={slideKey}
            mediaUrl={currentImage}
            direction={direction}
          />
        </AnimatePresence>

        {mediaUrls.length > 1 && (
          <StyledNextIconButton onClick={handleNext}>
            <ArrowForwardIos />
          </StyledNextIconButton>
        )}

        <StyledIndicatorContainer>
          {mediaUrls.map((_, i) => (
            <StyledFiberManualRecord
              currentIndex={i === currentIndex}
              key={i}
              color={i === currentIndex ? 'primary' : 'disabled'}
            />
          ))}
        </StyledIndicatorContainer>
      </StyledImageContainer>
    </StyledDialog>
  );
};

const StyledNextIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(8),
  zIndex: 2,

  [theme.breakpoints.down('sm')]: {
    right: theme.spacing(2),
  },
}));

const StyledPreviousIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: theme.spacing(8),
  zIndex: 2,

  [theme.breakpoints.down('sm')]: {
    left: theme.spacing(2),
  },
}));

const StyledImageContainer = styled(Box)(() => ({
  flex: 1,
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}));

const StyledDialogActions = styled(DialogActions)(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 2,
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paperFullScreen': {
    margin: theme.spacing(4),
    borderRadius: 2,
    width: 'calc(100% - 64px)',
    height: 'calc(100% - 64px)',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },

  [theme.breakpoints.down('sm')]: {
    '& .MuiDialog-paperFullScreen': {
      width: '100%',
      height: '100%',
      margin: 0,
    },
  },
}));

const StyledIndicatorContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(1),
  gap: theme.spacing(0.5),
}));

const StyledFiberManualRecord = styled(FiberManualRecord, {
  shouldForwardProp: (prop) => prop !== 'currentIndex',
})<{ currentIndex: boolean }>(({ theme, currentIndex }) => ({
  opacity: currentIndex ? 1 : 0.5,
  fontSize: theme.typography.caption.fontSize,
}));
