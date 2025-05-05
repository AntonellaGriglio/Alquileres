import React, { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

const Page: React.FC<
  PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ children, ...props }) => {
  const { className, ...rest } = props
  return (
    <div
      className={cn(
        "container flex flex-col gap-4 my-4 px-4 md:px-8",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

const PageTitle: React.FC<
  PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>
> = ({ children, ...props }) => {
  const { className, ...rest } = props
  return (
    <h1 className={cn("text-2xl font-semibold text-left w-full", className)} {...rest}>
      {children}
    </h1>
  )
}

export { Page, PageTitle }
