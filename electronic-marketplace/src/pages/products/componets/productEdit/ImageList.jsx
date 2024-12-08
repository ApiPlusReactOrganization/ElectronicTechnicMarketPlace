import React, { memo } from "react";
import ImageItem from "./ImageItem";
import { useSelector } from "react-redux";

const ImageList = () => {
  const images = useSelector((state) => state.product.productForEdit.images);
  return (
    <div className="d-flex gap-3 flex-wrap">
      {images.map((image) => (
        <ImageItem key={image.id} image={image} />
      ))}
    </div>
  );
};

export default memo(ImageList);
