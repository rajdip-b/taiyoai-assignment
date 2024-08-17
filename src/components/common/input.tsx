export default function Input({
  type,
  placeholder,
  name,
  value,
  className,
  onChange,
}: {
  type: string;
  placeholder?: string;
  name: string;
  value?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={`rounded-lg px-4 py-2 border-2 border-dark-secondary/50 focus:border-primary font-nunito font-light bg-light-primary/10 outline-none transition-all duration-200 ${className}`}
    />
  );
}
