export interface ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      type={props.type || 'button'}
      className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
    >
      {props.label}
    </button>
  );
}
