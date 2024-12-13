import React, { memo } from "react";

export const EditProductTitle = memo(({ name }) => {
  console.log("Rendering Title with name:", name);
  return <h1 className="m-0">Edit Product: {name}</h1>;
});
