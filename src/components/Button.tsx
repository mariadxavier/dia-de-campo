"use client";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export default function Button({ title, className, ...props }: ButtonProps) {
  return (
    <button className={`cursor-pointer font-bold ${className}`} {...props}>
      {title}
    </button>
  );
}
