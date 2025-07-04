import { useState, useEffect, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(
  apiCall: () => Promise<{ data: T }>,
  dependencies: any[] = []
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await apiCall();
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState({
        data: null,
        loading: false,
        error: error.response?.data?.message || error.message || 'An error occurred',
      });
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return {
    ...state,
    refetch,
  };
}

export function useApiWithParams<T, P>(
  apiCall: (params: P) => Promise<{ data: T }>,
  params: P | null = null
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = useCallback(async (requestParams: P) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await apiCall(requestParams);
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState({
        data: null,
        loading: false,
        error: error.response?.data?.message || error.message || 'An error occurred',
      });
    }
  }, [apiCall]);

  useEffect(() => {
    if (params) {
      fetchData(params);
    }
  }, [fetchData, params]);

  const refetch = (newParams?: P) => {
    if (newParams) {
      fetchData(newParams);
    } else if (params) {
      fetchData(params);
    }
  };

  return {
    ...state,
    refetch,
  };
} 