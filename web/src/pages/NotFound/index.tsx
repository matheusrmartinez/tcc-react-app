import "./styles.scss";

import React from "react";

import imageNotFound from '../../assets/img/imageNotFound.png';

const NotFound: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="img-not-found">
          <img src={imageNotFound} alt="Logo" />;
        </div>
      </div>
    </>
  );
};

export default React.memo(NotFound);
