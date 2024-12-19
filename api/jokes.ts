import axios from "axios";
import { useState } from "react";

export const useApproveJoke = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const approveJoke = async (
    jokeId: string,
    joke: string,
    category: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const approveResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_MODERATOR_SERVICE_URL}/moderator/jokes`,
        {
          jokeId,
          joke,
          category,
        }
      );

      setData(approveResponse.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { approveJoke, loading, error, data };
};

export const useRejectJoke = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const rejectJoke = async (jokeId: string) => {
    setLoading(true);
    setError(null);
    try {
      const rejectResponse = await axios.delete(
        `${process.env.NEXT_PUBLIC_MODERATOR_SERVICE_URL}/moderator/jokes/${jokeId}`
      );

      setData(rejectResponse.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { rejectJoke, loading, error, data };
};

export const useGetNextJoke = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const getNextJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const jokeResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_MODERATOR_SERVICE_URL}/moderator/jokes`
      );

      setData(jokeResponse.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { getNextJoke, loading, error, data };
};

export const useGetNextModeratedJoke = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);
    
    const getNextModeratedJoke = async (category?: string) => {
        setLoading(true);
        setError(null);
        try {
        const jokeResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_DELIVER_SERVICE_URL}/deliver-service/jokes${category ? `/${category}` : ""}`
        );
    
        setData(jokeResponse.data);
        } catch (error: any) {
        setError(error.message);
        } finally {
        setLoading(false);
        }
    };
    
    return { getNextModeratedJoke, loading, error, data };
}

export const useAddCategory = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);
    
    const addCategory = async (category: string) => {
        setLoading(true);
        setError(null);
        try {
        const addCategoryResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_MODERATOR_SERVICE_URL}/moderator/category`,
            {
            category,
            }
        );
    
        setData(addCategoryResponse.data);
        } catch (error: any) {
        setError(error.message);
        } finally {
        setLoading(false);
        }
    };
    
    return { addCategory, loading, error, data };
};

export const useGetCategories = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);
    
    const getCategories = async () => {
        setLoading(true);
        setError(null);
        try {
        const categoriesResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_MODERATOR_SERVICE_URL}/moderator/category`
        );
    
        setData(categoriesResponse.data);
        } catch (error: any) {
        setError(error.message);
        } finally {
        setLoading(false);
        }
    };
    
    return { getCategories, loading, error, data };
};

export const useSubmitJoke = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);
    
    const submitJoke = async (joke: string, category: string) => {
        setLoading(true);
        setError(null);
        try {
        const submitJokeResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_SUBMIT_SERVICE_URL}/submit-service/jokes`,
            {
            joke,
            category,
            }
        );
    
        setData(submitJokeResponse.data);
        } catch (error: any) {
        setError(error.message);
        } finally {
        setLoading(false);
        }
    };
    
    return { submitJoke, loading, error, data };
};


