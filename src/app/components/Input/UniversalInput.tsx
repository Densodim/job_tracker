"use client"
import React, {ChangeEvent, useEffect, useState} from "react"
import { CloseButton, Input } from "@mantine/core"

function UniversalInput({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
  onBlur,
  onKeyDown,
}: Props) {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleClear = () => {
    setInputValue("")
    onChange(type === "number" ? 0 : "")
  }

  return (
    <>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <Input
        type={type}
        value={String(inputValue)}
        onChange={(e) =>
          type === "number"
            ? onChange(Number(e.target.value))
            : onChange(e.target.value)
        }
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className="w-full border-gray-300 rounded-md p-1 focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={handleClear}
            style={{ display: inputValue ? undefined : "none" }}
          />
        }
      />
    </>
  )
}

export default UniversalInput

//type
type Props = {
  label?: string
  value: string | number
  placeholder?: string
  type?: "text" | "number" | "select"
  onChange: (value: string | number | ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
