import clsx from 'clsx';
import { forwardRef, type HTMLAttributes } from 'react';
import classes from './ToolsUninitialized.module.css';

export const ToolsUninitialized = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div className={clsx(classes.Container, className)} {...props} ref={ref}>
      {children}
    </div>
  );
});
