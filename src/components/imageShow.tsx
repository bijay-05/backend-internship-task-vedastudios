import React from 'react';
import { BasePropertyProps } from 'adminjs';

const ImageShow: React.FC<BasePropertyProps> = (props) => {
  const { record } = props;
  const image = record.params.Image; // this is from `after` hook for `show` action

  return (
    <div>
      <img src={image.url} alt={'Product Image'} style={{ width: '500px', marginRight: '10px' }} />
    </div>       
  );
  };

export default ImageShow;