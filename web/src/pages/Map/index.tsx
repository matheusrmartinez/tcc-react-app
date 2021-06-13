import "./styles.scss";

import React from "react";
import GoogleMaps from "../../components/Shared/GoogleMaps";

const Maps: React.FC = () => {
  return (
    <GoogleMaps />
  );
};

export default React.memo(Maps);
