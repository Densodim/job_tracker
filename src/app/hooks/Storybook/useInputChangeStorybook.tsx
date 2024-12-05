import { ChangeEvent, useState } from "react"

const useInputChangeStorybook = (
  initialValue: string | number,
  onChange: (value: string | number) => void,
) => {
  const [value, setValue] = useState<string | number>(initialValue)

  const handleChange = (
    input: string | number | ChangeEvent<HTMLInputElement>,
  ) => {
    if (typeof input === "string" || typeof input === "number") {
      setValue(input)
      onChange(input)
    } else if ("target" in input) {
      const newValue = input.target.value
      setValue(newValue)
      onChange(newValue)
    }
  }

  return { value, handleChange }
}

export default useInputChangeStorybook
