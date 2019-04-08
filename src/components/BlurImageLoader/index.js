import React, { useState, useEffect } from 'react';
import { LoadableImage } from './style';

const BlurImageLoader = ({ placeholder, image, ...props }) => {
  const runOnce = true;
  const [loadState, setLoadState] = useState({
    src: placeholder,
    loaded: false,
  });

  // only run when the function component initially mounts
  useEffect(() => {
    const img = new Image();

    img.onload = function() {
      // swap the placeholder with the load image
      setLoadState({
        src: img.src,
        loaded: true,
      });
    };
    // set the source to the final full version image which we want to load
    img.src = image;
  }, [runOnce]);

  return <LoadableImage {...props} {...loadState} />;
};

export default BlurImageLoader;
