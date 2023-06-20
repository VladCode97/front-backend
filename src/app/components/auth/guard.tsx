import { CircularProgress } from "@mui/joy";
import { useState, useEffect, FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RoleEnum } from "../../../domain/enum/role.enum";
import { decodeBase64 } from "../../../utils/decode";

const Guard: FC<{ role?: RoleEnum; children?: any; redirect?: string }> = (
  props
) => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const [access, setAccess] = useState("loading");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return nav("/signIn");
    }
    const user = decodeBase64(token);
    if (props.role) {
      if (user.role !== props.role) {
        if (props.redirect) return nav("/home");
        else return setAccess("ignore");
      }
    }
    setAccess("granted");
  }, [pathname, nav, props]);
  
  if (access === "loading") return <CircularProgress />;
  if (access === "ignore") return null;
  if (access === "granted") return props.children;
  
  return null
};

export default Guard;
