import { AlertCircle } from "lucide-react";

type Props = {
  error?: string;
};

export function FormError({ error }: Props) {
  return (
    <div className={error ? "" : "invisible"}>
      <span className="my-1 flex items-center gap-1">
        <AlertCircle className="h-4 text-red-700" />
        {error || "|"}
      </span>
    </div>
  );
}
