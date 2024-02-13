"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <section className="flex h-screen justify-center items-center text-center ">
          <div className="container mx-auto flex justify-center items-center">
            <div className="-mx-4 flex">
              <div className="w-full px-4">
                <div className="mx-auto max-w-[400px] text-center flex flex-col gap-7">
                  <h2 className="mb-2 text-[50px] font-bold leading-none text-black sm:text-[80px] md:text-[100px]">
                    404
                  </h2>
                  <h4 className="mb-3 text-[22px] font-semibold leading-tight text-black">
                    Oops! That page can’t be found
                  </h4>
                  <div className="flex flex-row gap-7 justify-center">
                    <button
                      onClick={reset}
                      className="inline-block rounded-lg border border-black px-8 py-3 text-center text-base font-semibold text-black transition hover:bg-black hover:text-white"
                    >
                      Try again
                    </button>

                    <button className="inline-block rounded-lg border border-black px-8 py-3 text-center text-base font-semibold text-black transition hover:bg-black hover:text-white">
                      <Link href="/">Home</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute h-screen left-0 top-0 -z-10 flex  w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
            <div className="h-full w-1/3 bg-gradient-to-t from-[#bcbbbb0b] to-[#C4C4C400]"></div>
            <div className="flex h-full w-1/3">
              <div className="h-full w-1/2 bg-gradient-to-b from-[#bcbbbb2b] to-[#C4C4C400]"></div>
              <div className="h-full w-1/2 bg-gradient-to-t from-[#bcbbbb2b] to-[#C4C4C400]"></div>
            </div>
            <div className="h-full w-1/3 bg-gradient-to-b from-[#bcbbbb2b] to-[#C4C4C400]"></div>
          </div>
        </section>
      </body>
    </html>
  );
}
