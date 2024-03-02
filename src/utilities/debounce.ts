function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number): (...args: Parameters<F>) => ReturnType<F> {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
    return function(...args: Parameters<F>) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => func(...args), waitFor);
    } as (...args: Parameters<F>) => ReturnType<F>;
  }
  
  export default debounce;
  