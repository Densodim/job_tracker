import React, { useState } from "react"
import UniversalSelect from "@/app/components/Select/UniversalSelect"
import { optionsSelect } from "@/app/components/AddItemForm/AddItemForm"

import UniversalInput from "@/app/components/Input/UniversalInput"

function EditableField({
  value,
  onSave,
  type = "text",
  style,
}: EditableFieldProps) {
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

  const renderInputField = () => (
    <UniversalInput
      type={type}
      value={inputValue}
      placeholder={"enter data"}
      onChange={setInputValue}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  )

  const renderSelectField = () => (
    <UniversalSelect
      value={String(inputValue)}
      onChange={(newValue) => {
        setInputValue(newValue)
        onSave(newValue)
        setIsEditing(false)
      }}
      options={optionsSelect || []}
      placeholder="Select an option"
    />
  )

  const renderDisplayValue = () => (
    <div
      onDoubleClick={() => setIsEditing(true)}
      className={`cursor-pointer p-1 hover:bg-gray-100 rounded ${style}`}
    >
      {value}
    </div>
  )

  if (isEditing) {
    if (type === "select") {
      return renderSelectField()
    }
    return renderInputField()
  }

  return renderDisplayValue()
}

export default EditableField

//type
type EditableFieldProps = {
  value: string | number
  onSave: (newValue: string | number) => void
  type?: "text" | "number" | "select"
  style: string
}
