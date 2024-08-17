export default function Button({
  onClick,
  text,
  className,
  children,
  type = 'primary',
}: {
  onClick?: () => void;
  text?: string;
  className?: string;
  children?: React.ReactNode;
  type?: 'primary' | 'secondary';
}) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 transition-all rounded-md font-semilight ${
        type === 'primary'
          ? 'text-light-primary hover:bg-primary/60 bg-primary '
          : 'text-dark-secondary bg-transparent border-2 border-dark-secondary/50 hover:border-primary'
      } ${className}`}
    >
      {children || text}
    </button>
  );
}
