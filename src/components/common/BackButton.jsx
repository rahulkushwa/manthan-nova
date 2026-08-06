import { ArrowLeft } from "lucide-react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import Button from "../ui/Button";

export default function BackButton({
  fallback,
  label = "Back",
  className = "",
}) {

  const navigate = useNavigate();

  const location = useLocation();

  function handleBack() {

    const from =
      location.state?.from;

    if (from) {

      navigate(from, {
        replace: true,
      });

      return;

    }

    if (fallback) {

      navigate(fallback, {
        replace: true,
      });

      return;

    }

    if (
      location.pathname.startsWith(
        "/admin"
      )
    ) {

      navigate("/admin", {
        replace: true,
      });

      return;

    }

    if (
      location.pathname.startsWith(
        "/dashboard"
      )
    ) {

      navigate("/dashboard", {
        replace: true,
      });

      return;

    }

    navigate("/", {
      replace: true,
    });

  }

  return (

    <Button
      variant="secondary"
      onClick={handleBack}
      className={`inline-flex items-center gap-2 ${className}`}
    >

      <ArrowLeft size={18} />

      {label}

    </Button>

  );

}