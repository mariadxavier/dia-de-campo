"use client";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export default function Button({ title, className, ...props }: ButtonProps) {
  return (
    <button className={`p-4 font-bold text-sm  ${className}`} {...props}>
      {title.toLocaleUpperCase()}
    </button>
  );
}
