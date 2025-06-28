import React, { useState } from 'react';
import { Plus, RotateCcw, Loader2 } from 'lucide-react';

function App() {
  const [counter, setCounter] = useState(0);
  const [joke, setJoke] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchJoke = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const data = await response.json();
      setJoke(data.value);
    } catch (error) {
      console.error('Failed to fetch joke:', error);
      setJoke('Failed to load joke.');
    } finally {
      setIsLoading(false);
    }
  };

  const increment = () => {
    setCounter(prev => prev + 1);
    fetchJoke();
  };

  const reset = () => {
    setCounter(0);
    setJoke('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl w-full border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Counter App</h1>
          <p className="text-gray-500">Click to increment or reset the counter</p>
        </div>

        <div className="text-center mb-10">
          <div className="text-lg text-gray-600 mb-2">Counter:</div>
          <div className={`text-6xl font-bold transition-colors duration-300 ${
            counter === 0 
              ? 'text-gray-400' 
              : 'text-orange-600'
          }`}>
            {counter}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <button
            onClick={increment}
            disabled={isLoading}
            className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Plus size={20} className="transition-transform group-active:rotate-90" />
            )}
            <span>{isLoading ? 'Loading...' : 'Increment'}</span>
          </button>
          
          <button
            onClick={reset}
            className="w-full bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
            disabled={counter === 0}
          >
            <RotateCcw size={20} className="transition-transform group-active:rotate-180" />
            <span>Reset</span>
          </button>
        </div>

        {(joke || isLoading) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Chuck Norris Fact</h2>
            <div className="joke-text bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 p-6 rounded-lg shadow-inner">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Loading Chuck Norris wisdom...</span>
                </div>
              ) : (
                <p className="joke-text-content text-gray-800 leading-relaxed italic text-lg font-medium">
                  "{joke}"
                </p>
              )}
            </div>
          </div>
        )}

        {/* Counter Stats */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Current Value</span>
            <span className="font-mono">{counter}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Status</span>
            <span className={`font-medium ${
              counter === 0 ? 'text-gray-400' : 'text-green-600'
            }`}>
              {counter === 0 ? 'At Zero' : 'Active'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;