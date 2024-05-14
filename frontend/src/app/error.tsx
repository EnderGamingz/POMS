'use client';

import { ArrowPathIcon } from '@heroicons/react/24/solid';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={'h-full w-full p-5'}>
      <div className={'mx-auto flex w-full max-w-6xl flex-col space-y-5'}>
        <div
          className={
            'flex flex-col items-center md:flex-row md:justify-between'
          }>
          <h1 className={'mb-2 text-3xl font-semibold'}>
            Error while trying to load page!
          </h1>
          <button
            className={
              'flex items-center gap-1 rounded-md bg-indigo-500 px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-400'
            }
            onClick={reset}>
            Try again <ArrowPathIcon className={'h-5 w-5'} />
          </button>
        </div>
        {error && (
          <pre
            className={
              'border-1 mx-auto max-w-4xl overflow-hidden overflow-ellipsis whitespace-break-spaces rounded-lg border border-red-500 bg-red-500/10 p-2 px-5'
            }>
            {error.message}
          </pre>
        )}
      </div>
    </div>
  );
}
