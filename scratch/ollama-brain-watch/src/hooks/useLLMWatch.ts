import { useState, useEffect } from 'react';
import axios from 'axios';

export interface WatchItem {
  id: number;
  title: string;
  source: string;
  date: string;
  url: string;
  trending: boolean;
}

export function useLLMWatch() {
  const [feed, setFeed] = useState<WatchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/api/watch');
        setFeed(data);
      } catch (e) {
        console.error('Watch Feed failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchTable();
  }, []);

  return { feed, loading };
}
