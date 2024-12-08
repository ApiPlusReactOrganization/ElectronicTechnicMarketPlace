import React, { memo } from "react";
import ImageItem from "./ImageItem";

const ImageList = ({ images, onRemoveImage }) => {
  return (
    <div className="d-flex gap-3 flex-wrap">
      {images.map((image) => (
        <ImageItem key={image.id} image={image} onRemoveImage={onRemoveImage} />
      ))}
    </div>
  );
};

export default memo(ImageList);
