import React, { useState } from "react"

export const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onSave,
  type = "text",
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  const handleBlur = () => {
    setIsEditing(false)
    if (inputValue !== value) {
      onSave(inputValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false)
      if (inputValue !== value) {
        onSave(inputValue)
      }
    } else if (e.key === "Escape") {
      setInputValue(value)
      setIsEditing(false)
    }
  }

  return isEditing ? (
    <input
      type={type}
      value={inputValue}
      autoFocus
      onBlur={handleBlur}
      onChange={(e) =>
        setInputValue(type === "number" ? +e.target.value : e.target.value)
      }
      onKeyDown={handleKeyDown}
      className="border p-1 rounded w-full"
    />
  ) : (
    <div
      onDoubleClick={() => setIsEditing(true)}
      className="cursor-pointer p-1 hover:bg-gray-100 rounded"
    >
      {value}
    </div>
  )
}

//type
type EditableFieldProps = {
  value: string | number
  onSave: (newValue: string | number) => void
  type?: "text" | "number"
}
