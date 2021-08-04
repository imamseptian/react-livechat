import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoadingFull } from "../views";

const Authenticated = (props) => {
  const history = useHistory();
  // const auth = useRecoilValue(authenticated);
  const [loading, setloading] = useState(true);
  const [userData, setuserData] = useState({
    user: null,
    token: null,
  });

  const storeCollector = () => {
    let store = JSON.parse(localStorage.getItem("LOGIN_JWT"));
    if (store && store.login) {
      // setauthData({
      //   ...authData,
      //   login: true,
      //   user: store.user,
      //   token: store.token,
      // });
      setloading(false);
      setuserData({ ...userData, user: store.user, token: store.token });
    } else {
      // setloading(false);
      history.push("/login");
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

export default Authenticated;
