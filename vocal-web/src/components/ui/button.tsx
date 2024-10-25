import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-70 disabled:text-[#6a6a6a] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: `bg-primary hover:shadow-lg text-white shadow-md inline-flex items-center justify-center py-2 cursor-pointer first-letter:uppercase`,
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: `inline-flex items-center justify-center py-2 cursor-pointer border-[2px] bg-primary/10 border-primary text-primary`,
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        doulingo: `inline-flex items-center !rounded-2xl
                  justify-center md:min-w-[200px] py-2 cursor-pointer border-[2px] border-b-[4px]
                  active:shadow-none active:border-b-[2px] active:translate-y-[2px] first-letter:uppercase`,
      },
      size: {
        default: 'rounded-md h-14 px-8 py-2 text-lg',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
      status: {
        primary: 'bg-primary/10 border-primary text-primary',
        red: 'bg-red-500/10 border-red-500 text-red-500',
        success: 'bg-green-500/10 border-green-500 text-green-500',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, status, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, status }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
