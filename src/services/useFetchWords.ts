import { wordsApiUrl } from "configs";
import { useState } from "react";

const useFetchWords = () => {
    const [controller, setController] = useState<AbortController>();
    const [loading, setLoading] = useState<boolean>(false);

    const abortRequest = () => {
        if (controller) {
            controller.abort();
        }
    }

    const fetchAndFilterWords = async (search: string): Promise<string[] | {}> => {
        abortRequest();

        const newController = new AbortController();
        setController(newController);

        try {
            if (!search) return [];

            setLoading(true);

            const response = await fetch(wordsApiUrl, {
                signal: newController.signal,
            });
            const words: string[] = await response.json();

            const filteredData = [...new Set(words)]
                .filter((word) => word.includes(search))
                .sort((a, b) => {
                    const startsWithA = Number(a.startsWith(search));
                    const startsWithB = Number(b.startsWith(search));
                    return startsWithB - startsWithA || a.localeCompare(b);
                });

            return filteredData;
            // I tried to use only one loop, but it's impossible to get words that start as in search and then sort alphabetically.
        } catch (err: any) {
            console.log(err.message);
            if(err.message.includes('aborted')) {
                return [];
            }
            
            return {
                hasError: true,
                message: 'Something went wrong'
            };
        } finally {
            setLoading(false);
        }
    };

    return { loading, setLoading, abortRequest, fetchAndFilterWords };
};

export default useFetchWords;
