export interface InputProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}

export default function Input(props: InputProps) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <input
          id={props.name}
          name={props.name}
          type={props.type || 'text'}
          required={props.required || false}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
        />
      </div>
    </div>
  );
}
