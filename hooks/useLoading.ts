import { useState } from 'react';

type AsyncFunction<T> = (...args: any[]) => Promise<T>;
type AsyncWrapper<T> = (...args: any[]) => Promise<T>;

export function useLoading<T>(asyncFunction: AsyncFunction<T>): [AsyncWrapper<T>, boolean] {
  const [loading, setLoading] = useState<boolean>(false);

  const asyncWrapper: AsyncWrapper<T> = async (...args: any[]) => {
    try {
      setLoading(true);
      const result = await asyncFunction(...args);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      console.error('Error in useLoading:', error);
      throw error;
    }
  };

  return [asyncWrapper, loading];
}