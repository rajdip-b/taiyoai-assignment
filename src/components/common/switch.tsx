export default function Switch({
  title,
  name,
  value,
  onChange,
}: {
  title: string;
  name: string;
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center gap-x-2 justify-between">
      <div className="font-light">{title}</div>
      <input
        name={name}
        type="checkbox"
        onChange={onChange}
        value={value === true ? 'on' : 'off'}
        checked={value}
        className="w-5 h-5"
      />
    </div>
  );
}
