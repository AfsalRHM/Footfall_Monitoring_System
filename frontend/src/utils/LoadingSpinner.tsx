const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-40 w-full">
      <div className="w-10 h-10 border-4 border-indigo-500 border-dashed rounded-full animate-spin dark:border-indigo-400"></div>
    </div>
  );
};

export default LoadingSpinner;
