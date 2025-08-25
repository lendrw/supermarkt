import { useState } from "react";
import { SearchContext } from "./SearchContext";

interface ISearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<ISearchProviderProps> = ({
  children,
}) => {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
