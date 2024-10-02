import type { HTMLAttributes } from 'react';
import clsx from 'clsx';
import classes from './ToolsUninitialized.module.css';

export function ToolsUninitialized({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx(classes.Container, className)} {...props}>
      {children}
    </div>
  );
}
