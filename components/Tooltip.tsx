'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProgressDots from './ProgressDots'
import { Step } from '../lib/api-client'

interface TooltipProps {
  step: Step
  currentStep: number
  totalSteps: number
  onNext: () => void
  onBack: () => void
  onSkip: () => void
}

export default function Tooltip({
  step,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSkip
}: TooltipProps) {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const calculatePosition = () => {
      const element = document.querySelector(step.target_selector)
      if (!element) return

      const rect = element.getBoundingClientRect()
      const tooltipWidth = 320
      const tooltipHeight = 200 // Approx height, logic can be more dynamic
      const offset = 16

      let top = 0
      let left = 0

      // Simplistic positioning logic matching the previous one but using step.position
      switch (step.position) {
        case 'top':
          top = rect.top - tooltipHeight - offset
          left = rect.left + rect.width / 2 - tooltipWidth / 2
          break
        case 'bottom':
          top = rect.bottom + offset
          left = rect.left + rect.width / 2 - tooltipWidth / 2
          break
        case 'left':
          top = rect.top + rect.height / 2 - tooltipHeight / 2
          left = rect.left - tooltipWidth - offset
          break
        case 'right':
          top = rect.top + rect.height / 2 - tooltipHeight / 2
          left = rect.right + offset
          break
      }

      // Viewport bounds check (simplistic)
      if (left < 10) left = 10;
      if (top < 10) top = 10;

      setTooltipPosition({ top, left })
    }

    calculatePosition()
    // Small delay to ensure layout is ready
    const timer = setTimeout(calculatePosition, 100);
    
    window.addEventListener('resize', calculatePosition)
    window.addEventListener('scroll', calculatePosition)

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePosition)
      window.removeEventListener('scroll', calculatePosition)
    }
  }, [step])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed',
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        zIndex: 10001,
      }}
      className="w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden font-sans"
    >
      {/* Header */}
      <div className="px-5 py-4 flex justify-between items-start border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-lg">{step.title}</h3>
        <button 
          onClick={onSkip}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        <p className="text-gray-600 text-sm leading-relaxed">{step.content}</p>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ProgressDots current={currentStep} total={totalSteps} />
          <span className="text-xs text-gray-500 ml-2">Step {currentStep + 1} of {totalSteps}</span>
        </div>
        
        <div className="flex gap-2">
          {currentStep > 0 && (
            <button
              onClick={onBack}
              className="text-sm text-gray-500 hover:text-gray-800 font-medium px-2 py-1"
            >
              Back
            </button>
          )}
          <button
            onClick={onNext}
            className="px-4 py-1.5 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 font-medium shadow-sm transition-colors"
          >
            {currentStep === totalSteps - 1 ? 'Finish' : 'Next →'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

