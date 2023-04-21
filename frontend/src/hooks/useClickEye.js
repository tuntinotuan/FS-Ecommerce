import { useEffect, useRef, useState } from "react";

export default function useClickEye() {
  const [click, setClick] = useState(true);
  // const nodeRef = useRef(null);
  return {
    click,
    setClick,
    // nodeRef,
  };
}
