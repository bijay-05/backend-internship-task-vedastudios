import React from 'react';
import { BasePropertyProps } from 'adminjs';

const ImageList: React.FC<BasePropertyProps> = (props) => {
  const { record } = props;
  const image = record.params.Image; // this is from `after` hook for `list` action

  return (
    <div>
      <img src={image.url} alt={'Product Image'} style={{ width: '200px', marginRight: '10px' }} />
    </div>       
  );
};

export default ImageList;