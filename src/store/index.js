import { atom } from "recoil";

const authenticated = atom({
  key: "authenticated",
  default: {
    login: false,
    user: { name: "imam septian" },
    token: "",
  },
});

export { authenticated };
