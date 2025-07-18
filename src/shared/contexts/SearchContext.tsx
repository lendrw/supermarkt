/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

interface ISearchContextType {
  query: string;
  setQuery: (query: string) => void;
}

const SearchContext = createContext({} as ISearchContextType);

export const useSearchContext = () => {
    return useContext(SearchContext);
};

interface ISearchProviderProps {
    children: React.ReactNode;
}

export const SearchProvider: React.FC<ISearchProviderProps> = ({ children }) => {
  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

