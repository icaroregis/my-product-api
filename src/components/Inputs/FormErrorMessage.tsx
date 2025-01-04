type FormErrorMessageProps = {
  message: string;
};

export function FormErrorMessage({ message }: Readonly<FormErrorMessageProps>) {
  return <p className="mt-1 text-red-400 text-[10px] font-ubuntu">{message}</p>;
}
