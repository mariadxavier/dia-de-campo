"use client";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: string;
  children?: React.ReactNode;
};

export default function Button({ title, className, children, ...props }: ButtonProps) {
  return (
    <button className={`cursor-pointer font-bold ${className}`} {...props}>
      {title}
      {children}
    </button>
  );
}
