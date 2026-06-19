import { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="glass rounded-2xl p-8 shadow-glass">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-sm font-medium text-gray-600">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
