import { RefObject, useEffect } from 'react';

interface UseOutsideClickProps {
  ref: RefObject<HTMLElement>;
  callback: () => void;
}

const useOutsideClick = ({ ref, callback }: UseOutsideClickProps) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
