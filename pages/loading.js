const Loading = () => {
  return (
    <div className="bg-orange-500 h-screen flex justify-center items-center">
      <div className="text-center">
        <span class="flex h-3 w-80">
          <span class="animate-ping absolute inline-flex h-1 w-80 rounded-full bg-orange-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-max"></span>
        </span>
      </div>
    </div>
  );
};

export default Loading;
