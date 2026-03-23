"use client"
import { useEffect } from "react"

export default function InitTheme() {
  useEffect(() => {
    const storedTheme = localStorage.getItem("payload-theme")
    const theme = storedTheme === "dark" ? "dark" : "light"
    document.documentElement.setAttribute("data-theme", theme)
  }, [])

  return null
}