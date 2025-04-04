import { ReactNode } from 'react';
import { MouseEventHandler } from 'react';

export type ButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ children, onClick, className, size = 'md', type = 'button', ...props }: ButtonProps) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-circle bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all flex items-center justify-center ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;