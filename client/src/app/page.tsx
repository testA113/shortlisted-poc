import { Inter } from "@next/font/google";

import { ReviewForm } from "./ReviewForm/ReviewForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div id="page" className="flex w-full flex-col items-center py-4">
        <div
          id="header"
          className="prose flex flex-col items-center py-4 text-center"
        >
          <h1 className={inter.className}>Shortlisted.ai</h1>
          <p>
            To get shortlisted for your role, we give you custom feedback on
            your resume. Powered by ChatGPT, we tailor feedback for each job
            that you apply for.
          </p>
        </div>
        <div className="prose text-center">
          <ReviewForm />
        </div>
      </div>
    </main>
  );
}
