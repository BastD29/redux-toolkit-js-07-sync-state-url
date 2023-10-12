import { useSearchParams } from "react-router-dom";

export function useSearchParamsState(searchParamName, defaultValue) {
  const [searchParams, setSearchParams] = useSearchParams();
  const acquiredSearchParam = searchParams.get(searchParamName);
  console.log("acquiredSearchParam", acquiredSearchParam);
  const searchParamsState = acquiredSearchParam ?? defaultValue;
  console.log("searchParamsState", searchParamsState);

  const setSearchParamsState = (newState) => {
    const next = Object.assign(
      {},
      [...searchParams.entries()].reduce(
        (o, [key, value]) => ({ ...o, [key]: value }),
        {}
      ),
      { [searchParamName]: newState }
    );
    setSearchParams(next);
  };

  return [searchParamsState, setSearchParamsState];
}
