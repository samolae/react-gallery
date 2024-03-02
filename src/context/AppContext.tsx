import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchImages } from '../api/unsplash';  

 interface Image {
  id: string;
  urls: { small: string; regular: string;  full: string; };
  downloads?: number;
  views?: number;
  likes?: number;
}

 interface Cache {
  [key: string]: Image[];
}

 interface ContextProps {
  history: string[];
  cache: Cache;
  addHistory: (term: string, results?: Image[]) => void;
  getResultsFromCache: (term: string) => Image[] | undefined;
  fetchAndCacheImages: (term: string) => Promise<void>;
}

 const AppContext = createContext<ContextProps | undefined>(undefined);

 export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<string[]>([]);
  const [cache, setCache] = useState<Cache>({});

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    const storedCache = localStorage.getItem('searchCache');
    if (storedHistory) setHistory(JSON.parse(storedHistory));
    if (storedCache) setCache(JSON.parse(storedCache));
  }, []);

   const addHistory = (term: string, newResults?: Image[]) => {
    if (!term.trim() || !newResults) return;  

    
    const updatedHistory = Array.from(new Set([...history, term]));
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    const existingResults = cache[term] || [];
    const updatedResults = [...existingResults, ...newResults];
    const updatedCache = { ...cache, [term]: updatedResults };
    setCache(updatedCache);
    localStorage.setItem('searchCache', JSON.stringify(updatedCache));
  };

  const fetchAndCacheImages = async (term: string) => {
    const results = await fetchImages(term);
    addHistory(term, results);
  };

  return (
    <AppContext.Provider value={{ history, cache, addHistory, getResultsFromCache: (term) => cache[term], fetchAndCacheImages }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
