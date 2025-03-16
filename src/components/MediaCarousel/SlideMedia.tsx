import { Box, Skeleton, styled } from '@mui/material';
import { motion, PanInfo } from 'framer-motion';
import { useEffect, useState } from 'react';

function isVideoUrl(url: string): boolean {
  return /\.(mp4|mov|webm|ogv)$/i.test(url);
}

interface SlideMediaProps {
  mediaUrl: string;
  direction: 'next' | 'prev';
  handleNext: () => void;
  handlePrev: () => void;
}

export function SlideMedia({ mediaUrl, direction, handleNext, handlePrev }: SlideMediaProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    // After 0.5s, if the image still isn’t loaded, show the skeleton
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setShowSkeleton(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  if (!mediaUrl) {
    return null;
  }

  const handleLoaded = () => {
    setIsLoaded(true);

    // If the skeleton is shown, keep it up for at least 1 second
    if (showSkeleton) {
      setTimeout(() => {
        setShowSkeleton(false);
      }, 1000);
    }
  };

  const handleDragEnd = (_event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.x < -100 || info.velocity.x < -500) {
      handleNext();
    } else if (info.offset.x > 100 || info.velocity.x > 500) {
      handlePrev();
    }
  };

  const video = isVideoUrl(mediaUrl);

  return (
    <>
      {showSkeleton && (
        <StyledSkeletonContainer>
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </StyledSkeletonContainer>
      )}

      {video ? (
        <StyledMotionVideo
          src={mediaUrl}
          controls
          onLoadedData={handleLoaded}
          drag="x"
          autoPlay
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          initial={{ x: direction === 'next' ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          onDragEnd={handleDragEnd}
        />
      ) : (
        <StyledMotionImg
          src={mediaUrl}
          onLoad={handleLoaded}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          initial={{ x: direction === 'next' ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          onDragEnd={handleDragEnd}
        />
      )}
    </>
  );
}

const StyledMotionImg = styled(motion.img)(() => ({
  position: 'absolute',
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
}));

const StyledMotionVideo = styled(motion.video)(() => ({
  position: 'absolute',
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
}));

const StyledSkeletonContainer = styled(Box)(() => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
