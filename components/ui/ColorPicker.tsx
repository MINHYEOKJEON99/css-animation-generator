'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ColorPickerProps {
  id?: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function ColorPicker({ id, value, onChange, className }: ColorPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(value)

  React.useEffect(() => {
    setInternalValue(value)
  }, [value])

  const handleColorChange = (newColor: string) => {
    setInternalValue(newColor)
    onChange(newColor)
  }

  const presetColors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#8000ff',
    '#808080', '#400000', '#004000', '#000040', '#404040'
  ]

  return (
    <div className={cn('relative', className)}>
      <div className="flex items-center space-x-2">
        {/* Color preview and native picker */}
        <div className="flex items-center space-x-2">
          <div
            className="w-8 h-8 rounded border-2 border-gray-300 cursor-pointer"
            style={{ backgroundColor: internalValue }}
            onClick={() => setIsOpen(!isOpen)}
          />
          <input
            id={id}
            type="color"
            value={internalValue}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-0 h-0 opacity-0 absolute"
          />
          <input
            type="text"
            value={internalValue}
            onChange={(e) => handleColorChange(e.target.value)}
            className="flex h-8 w-20 rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Preset colors dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 p-2 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-50">
          <div className="grid grid-cols-5 gap-1">
            {presetColors.map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => {
                  handleColorChange(color)
                  setIsOpen(false)
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}