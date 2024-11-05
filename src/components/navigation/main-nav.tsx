"use client"

import * as React from "react"
import Link from "next/link"
import { Car, LogOut, Menu } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { ROLES_USUARIO } from "@/lib/Auth/types/roles-usuario"
import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const { data } = useSession()

  const navItems = [...(items ?? [])]
  if (data?.user.id) {
    if (data?.user.roles.some((rol) => rol === ROLES_USUARIO.Admin)) {
      navItems.push({ title: "Usuarios", href: "/usuarios" })
      navItems.push({ title: "Zonas", href: "/zonas" })
      navItems.push({ title: "Reportes", href: "/reportes" })
    }

    if (data?.user.roles.some((rol) => rol === ROLES_USUARIO.Cajero)) {
      navItems.push({ title: "Nuevo Pago", href: "/pagos" })
    }

  }

  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-6 md:gap-10">
        {navItems?.length ? (
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger className="mt-2">
                <Menu />
              </SheetTrigger>
              <SheetContent side={"left"} className="w-[300px] sm:w-[340px]">
                <SheetHeader>
                  <SheetTitle className="text-left text-xl font-bold ml-3">
                    Menú
                  </SheetTitle>
                  <SheetDescription>
                    <div className="flex flex-col gap-2 ml-4">
                      {navItems?.map(
                        (item, index) =>
                          item.href && (
                            <Link
                              key={index}
                              href={item.href}
                              className={cn(
                                "flex items-center text-lg font-medium text-muted-foreground",
                                item.disabled && "cursor-not-allowed opacity-80"
                              )}
                            >
                              {item.title}
                            </Link>
                          )
                      )}
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        ) : null}
        <Link href="/" className="flex items-center space-x-2">
          <Car className="size-6 text-primary" />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </Link>
        {navItems?.length ? (
          <nav className="hidden md:flex gap-6">
            {navItems?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium text-muted-foreground",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}
      </div>
      {data?.user && (
        <Button
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <LogOut className="size-4 mr-2" />
          Cerrar sesión
        </Button>
      )}
    </div>
  )
}
