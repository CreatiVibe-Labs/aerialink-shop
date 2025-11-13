import { useState, useEffect } from "react";

export const useConsumerTax = () => {
  const [consumerTax, setConsumerTax] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConsumerTax = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        
        const apiUrl = `${baseUrl}/consumer-tax`;

        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        if (!res.ok) {
          console.error(`Consumer Tax API returned status ${res.status}`);
          setConsumerTax(0); 
          return;
        }

        const data = await res.json();

        // Handle different possible API response formats
        let taxRate = 0;
        if (typeof data === 'number') {
          taxRate = data;
        } else if (data && typeof data === 'object') {
          taxRate = data.consumer_tax_percentage || 0;
        }

        setConsumerTax(Number(taxRate));
        setError(null);
      } catch (err) {
        // Set default tax rate of 0 if API fails completely
        setConsumerTax(0);
        setError(err instanceof Error ? err.message : 'Failed to fetch consumer tax');
      } finally {
        setLoading(false);
      }
    };

    fetchConsumerTax();
  }, []);

  return { consumerTax, loading, error };
};