import { useState } from "react";
import { HashLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

function Spinner() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <HashLoader
        color="blue"
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
}
export default Spinner;
