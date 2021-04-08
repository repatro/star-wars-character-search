import React, { useState, useEffect } from 'react';

import { getSWHomeworldByUrl } from '../API';
import { IFetchedEntity, ISWHomeworld } from '../types';

interface IHomeworldProps {
  url: string;
  isVisible?: boolean;
}
function Homeworld({ url, isVisible }: IHomeworldProps) {
  const [homeworldData, setHomeworldData] = useState<IFetchedEntity<ISWHomeworld>>({ isLoading: false });

  useEffect(() => {
    if (isVisible) {
      const { getData, abort } = getSWHomeworldByUrl(url);
      setHomeworldData({ isLoading: true, abortLoading: abort });
      getData()
        .then((entity) => setHomeworldData({ entity, isLoading: false }))
        .catch(
          (e) => e.name !== 'AbortError' && setHomeworldData({ ...homeworldData, isLoading: false, error: e.message })
        );
    }
    return () => homeworldData.abortLoading?.();
  }, [url, isVisible]);

  useEffect(() => {
    if (!isVisible) {
      homeworldData.abortLoading?.();
    }
  }, [isVisible]);

  return <span>{homeworldData.entity ? homeworldData.entity.name : '-'}</span>;
}
export default Homeworld;
