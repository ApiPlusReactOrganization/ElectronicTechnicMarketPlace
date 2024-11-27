import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useActions from "../../../../hooks/useActions";
import { useSelector } from 'react-redux';

const SideBarCategory = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { getCategories } = useActions();
  const categoryList = useSelector((state) => state.category.categoryList);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/electronicItem/${categoryId}`); 
  };

  return (
    <div className="d-flex">
      {isVisible && (
        <div className="bg-light border p-3" style={{ width: '250px' }}>
          <button
            className="btn btn-sm btn-primary mb-3"
            onClick={toggleSidebar}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div>
            <h5>Categories</h5>
            <ul className="list-unstyled">
              {categoryList.length > 0 ? (
                categoryList.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {category.name}
                  </li>
                ))
              ) : (
                <li>No categories available</li>
              )}
            </ul>
          </div>
        </div>
      )}
      {!isVisible && (
        <button
          className="btn btn-primary m-3"
          onClick={toggleSidebar}
        >
            <i className="fas fa-arrow-right"></i>
        </button>
      )}
    </div>
  );
};

export default SideBarCategory;
