import type { T } from "node_modules/tailwindcss/dist/types-B254mqw1.d.mts";

type Props = {
  label: string;
  type?: string;
  id: string;
  textarea?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  value?: string | number;
  onChange?:
    | ((section: T, field: string, value: string) => void)
    | ((e: React.ChangeEvent<HTMLInputElement>) => void);
};

export default function Input({
  label,
  type,
  id,
  textarea,
  ref,
  value,
  onChange,
  ...props
}: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      {textarea ? (
        <textarea
          required
          className="border border-gray-200 rounded px-4 py-2 resize-none"
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          {...props}
        />
      ) : (
        <input
          type={type}
          className="border border-gray-200 rounded px-4 py-2"
          required
          name={id}
          id={id}
          ref={ref}
          value={value}
          {...props}
          onChange={onChange}
        />
      )}
    </div>
  );
}
