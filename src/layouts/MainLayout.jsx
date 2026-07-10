import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SmoothScroll from "../components/common/SmoothScroll";
import MouseGlow from "../components/common/MouseGlow";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

export default function MainLayout() {
  return (
    <>
      <MouseGlow />
      <SmoothScroll />
      <ScrollToTop />
      <Outlet />
    </>
  );
}