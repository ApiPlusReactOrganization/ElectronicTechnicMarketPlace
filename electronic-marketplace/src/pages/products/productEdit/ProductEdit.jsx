import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useActions from "../../../hooks/useActions";
import NotFoundProductImage from "../../../assets/images/productNotFound.png";
import productImage from "../../../hooks/productImage";
import { useSelector } from "react-redux";

const ProductEdit = () => {
  const { getProductById, deleteProductImageById, addProductImages } =
    useActions();
  const { productId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const product = useSelector((state) => state.product.productForEdit);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await getProductById(productId);
        if (result.success) {
        } else {
          toast.error(result.message || "Failed to load product");
        }
      } catch (error) {
        toast.error("An error occurred while loading the product");
      }
    };

    fetchProduct();
  }, []);

  const handleRemoveImage = async (productImageId) => {
    try {
      const result = await deleteProductImageById(product.id, productImageId);

      if (result.success) {
        toast.success("Image removed successfully!");
      } else {
        toast.error(result.message || "Failed to remove image");
      }
    } catch (error) {
      toast.error("An error occurred while removing the image");
    }
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };  

  const handleSaveImage = async () => {
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
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while uploading images.");
    }
  }; 
  

  if (!product)
    return <img width="400" src={NotFoundProductImage} alt="Not Found" />;

  return (
    <div>
      <div className="d-flex flex-column align-items-center gap-3">
        <h1 className="m-0">Edit Product: {product.name}</h1>
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex gap-3 align-items-center mt-3">
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
            <div className="d-flex gap-3">
              {product.images.map((image) => (
                <div key={image.id} className="position-relative">
                  <button
                    type="button"
                    className="btn-close position-absolute top-0 end-0 bg-danger p-2"
                    aria-label="Close"
                    onClick={() => handleRemoveImage(image.id)}
                  />
                  <img
                    height="200"
                    width="200"
                    alt="Product"
                    loading="lazy"
                    src={productImage(image.filePath)}
                    className="border rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;

