"use client";
import { Inter } from "@next/font/google";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { ReviewForm } from "./ReviewForm/ReviewForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <div
          id="page"
          className="flex w-full max-w-page flex-col items-center px-10vw py-4"
        >
          <div
            id="header"
            className="prose flex flex-col items-center py-4 text-center"
          >
            <h1 className={inter.className}>Shortlisted.ai</h1>
            <p>
              Get shortlisted for your job application! Upload your resume and
              we give you custom feedback on your resume. Powered by ChatGPT, we
              tailor feedback for each job that you apply for.
            </p>
          </div>
          <div className="prose max-w-full text-center">
            <ReviewForm />
          </div>
        </div>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
