import React, { useState, useCallback, memo } from "react";
import { toast } from "react-toastify";
import useActions from "../../../../hooks/useActions";
import productImage from "../../../../hooks/productImage";
import ImageList from "./ImageList";

const ProductImages = ({ product }) => {
  const { addProductImages } = useActions();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = useCallback((event) => {
    setSelectedFiles(event.target.files);
  }, []);

  const handleSaveImage = useCallback(async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error("Please select images to upload.");
      return;
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("imagesFiles", file);
    });

    try {
      const result = await addProductImages(product.id, formData);
      if (result.success) {
        toast.success("Images uploaded successfully!");
      } else {
        toast.error(result.message || "Error uploading images");
      }
    } catch (error) {
      toast.error("An error occurred while uploading images");
    }
  }, [selectedFiles, product.id, addProductImages]);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex gap-3 align-items-center m-3">
        <input
          multiple
          type="file"
          className="form-control"
          id="formFile"
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/gif"
        />
        <button
          type="button"
          className="btn btn-primary"
          style={{ whiteSpace: "nowrap" }}
          onClick={handleSaveImage}
        >
          Add Images
        </button>
      </div>
      <div className="d-flex justify-content-center">
        {product.images.length === 0 ? (
          <img
            height="200"
            alt="Product Image"
            loading="lazy"
            src={productImage(undefined)}
          />
        ) : (
          <ImageList images={product.images} />
        )}
      </div>
    </div>
  );
};

export default memo(ProductImages);
