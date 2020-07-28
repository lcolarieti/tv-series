import {useEffect, useState} from 'react';
import {ShowInterface} from '../interfaces/show';


export const useSearchApi = (url: string): ShowInterface[] => {
  const [searchResults, setSearchResults] = useState<ShowInterface[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      setSearchResults((await response.json()));
    })();
  }, [url]);

  return searchResults;
};