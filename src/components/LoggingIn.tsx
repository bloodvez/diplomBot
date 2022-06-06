import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "./Loading/Loading";

function LoggingIn() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("tk");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (param === null) return;
    // declare the data fetching function
    const fetchData = async () => {
      const response = await fetch(
        `http://h.ladvez.net:5556/api/login?tk=${param}`
      );
      if (response.status !== 200) return;
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", param);
      navigate("../", { replace: true });
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  });

  return (
    <>
      <Loading text="Logging you in..." />
    </>
  );
}

export default LoggingIn;
