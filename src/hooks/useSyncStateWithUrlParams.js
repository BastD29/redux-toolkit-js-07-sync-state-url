import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export const useSyncStateWithUrlParams = (
  paramName,
  selector,
  action,
  initialValue
) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const value = useSelector(selector);

  useEffect(() => {
    const urlValue = searchParams.get(paramName);
    if (urlValue && urlValue !== value) {
      dispatch(action(urlValue));
    } else if (!urlValue && value) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set(paramName, value);
      setSearchParams(newSearchParams);
    }
  }, [value, searchParams, setSearchParams, dispatch, paramName, action]);

  const setValue = (newValue) => {
    dispatch(action(newValue));
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(paramName, newValue);
    setSearchParams(newSearchParams);
  };

  return [value, setValue];
};
