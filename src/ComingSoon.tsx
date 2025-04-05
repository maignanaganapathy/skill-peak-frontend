
import React from 'react';
import { CSSProperties } from 'react'; // Import CSSProperties

interface ComingSoonProps {}

const ComingSoon: React.FC<ComingSoonProps> = () => {
  const styles: { [key: string]: CSSProperties } = { // Define the type of styles
    comingSoonContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f4f4f4', // Optional background color
    },
    heading: {
      fontSize: '3em',
      marginBottom: '10px',
      color: '#333',
    },
    paragraph: {
      fontSize: '1.2em',
      color: '#777',
    },
  };

  return (
    <div style={styles.comingSoonContainer}>
      <h1 style={styles.heading}>Coming Soon...</h1>
      
    </div>
  );
};

export default ComingSoon;