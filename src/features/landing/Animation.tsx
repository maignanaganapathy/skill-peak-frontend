import React, { useState, useEffect } from 'react';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';

const AnimatedCheckCircles = () => {
  const [stage, setStage] = useState(0);
  const [circles, setCircles] = useState([
    { size: 'small', filled: false, text: 'LEARN' },
    { size: 'medium', filled: false, text: 'APPLY' },
    { size: 'large', filled: false, text: 'SUCCESS' },
  ]);
  const theme = useTheme();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | number | undefined;

    if (stage === 0) {
      timeoutId = setTimeout(() => {
        setStage(1);
      }, 2000);
    } else if (stage === 1) {
      setCircles((prev) => [
        { ...prev[0], filled: true },
        { ...prev[1] },
        { ...prev[2] },
      ]);
      timeoutId = setTimeout(() => {
        setStage(2);
      }, 500);
    } else if (stage === 2) {
      setCircles((prev) => [
        { ...prev[0] },
        { ...prev[1], filled: true },
        { ...prev[2] },
      ]);
      timeoutId = setTimeout(() => {
        setStage(3);
      }, 500);
    } else if (stage === 3) {
      setCircles((prev) => [
        { ...prev[0] },
        { ...prev[1] },
        { ...prev[2], filled: true },
      ]);
      timeoutId = setTimeout(() => {
        setStage(4);
      }, 500);
    } else if (stage === 4) {
      timeoutId = setTimeout(() => {
        setStage(0);
        setCircles([
          { size: 'small', filled: false, text: 'LEARN' },
          { size: 'medium', filled: false, text: 'APPLY' },
          { size: 'large', filled: false, text: 'SUCCESS' },
        ]);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [stage]);

  const circleStyles: { [key: string]: { fontSize: number; color: string } } = {
    small: { fontSize: 24, color: theme.palette.primary.main },
    medium: { fontSize: 36, color: theme.palette.primary.main },
    large: { fontSize: 48, color: theme.palette.primary.main },
  };

  const lineStyles = {
    borderBottom: `3px dashed ${theme.palette.primary.main}`,
    width: '110px',
  };

  const filledLineStyles = {
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    width: '110px',
  };

  const getLineStyle = (index: number) => {
    if (stage === 1 && index === 0) return filledLineStyles;
    if (stage === 2 && index === 0) return filledLineStyles;
    if (stage === 2 && index === 1) return filledLineStyles;
    if (stage === 3 && index === 0) return filledLineStyles;
    if (stage === 3 && index === 1) return filledLineStyles;
    return lineStyles;
  };

  const textStyles = {
    transition: 'transform 0.8s ease-in-out',
    transform: 'scale(1)',
    marginBottom: '10px',
  };

  const zoomedTextStyles = {
    ...textStyles,
    transform: 'scale(1.2)',
    fontWeight: 'bold',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {circles.map((circle, index) => (
        <React.Fragment key={index}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={circle.filled ? zoomedTextStyles : textStyles}>{circle.text}</div>
            {circle.filled ? (
              <CheckCircleIcon style={{ ...circleStyles[circle.size] }} />
            ) : (
              <CheckCircleOutlinedIcon style={{ ...circleStyles[circle.size] }} />
            )}
          </div>
          {index < 2 && (
            <div
              style={{
                ...getLineStyle(index),
                alignSelf: 'center',
                marginLeft: '30px',
                marginRight: '30px',
                marginTop: '40px', // Add 2px margin to the top
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default AnimatedCheckCircles;