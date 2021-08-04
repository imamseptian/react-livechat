import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoadingFull } from "../views";

const Guest = (props) => {
  const history = useHistory();

  const [loading, setloading] = useState(true);

  const storeCollector = () => {
    let store = JSON.parse(localStorage.getItem("LOGIN_JWT"));
    if (store && store.login) {
      history.push("/");
    } else {
      setloading(false);
    }
  };

  useEffect(() => {
    storeCollector();
  }, []);

  if (loading) {
    return <LoadingFull />;
  }

  return props.children;
};

export default Guest;
