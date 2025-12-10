'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface TourStep {
  id: string
  target: string
  title: string
  content: string
  position: 'top' | 'bottom' | 'left' | 'right'
}

export default function CreateWidget() {
  const [tourName, setTourName] = useState('')
  const [steps, setSteps] = useState<TourStep[]>([])
  const [currentStep, setCurrentStep] = useState<Partial<TourStep>>({
    target: '',
    title: '',
    content: '',
    position: 'bottom'
  })
  const [generatedCode, setGeneratedCode] = useState('')

  const addStep = () => {
    if (currentStep.target && currentStep.title && currentStep.content) {
      const newStep: TourStep = {
        id: `step-${Date.now()}`,
        target: currentStep.target,
        title: currentStep.title,
        content: currentStep.content,
        position: currentStep.position || 'bottom'
      }
      setSteps([...steps, newStep])
      setCurrentStep({ target: '', title: '', content: '', position: 'bottom' })
    }
  }

  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id))
  }

  const generateWidget = () => {
    const tourId = `tour-${Date.now()}`
    const config = {
      tourId,
      name: tourName,
      steps
    }

    const embedCode = `<!-- TourGuide Widget -->
<script>
  window.TourGuideConfig = ${JSON.stringify(config, null, 2)};
</script>
<script src="${window.location.origin}/widget.js"></script>`

    setGeneratedCode(embedCode)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    alert('Code copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded"></div>
            <span className="font-semibold text-gray-900">TOURGUIDE</span>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-600">Create Widget</span>
          </div>
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Home
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Widget Builder */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Widget Builder</h2>
              
              {/* Tour Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tour Name
                </label>
                <input
                  type="text"
                  value={tourName}
                  onChange={(e) => setTourName(e.target.value)}
                  placeholder="e.g., Welcome Tour"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Add Step Form */}
              <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Add Step</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Element (CSS Selector)
                  </label>
                  <input
                    type="text"
                    value={currentStep.target}
                    onChange={(e) => setCurrentStep({ ...currentStep, target: e.target.value })}
                    placeholder="e.g., #signup-button"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Step Title
                  </label>
                  <input
                    type="text"
                    value={currentStep.title}
                    onChange={(e) => setCurrentStep({ ...currentStep, title: e.target.value })}
                    placeholder="e.g., Create Your Account"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    value={currentStep.content}
                    onChange={(e) => setCurrentStep({ ...currentStep, content: e.target.value })}
                    placeholder="Describe what the user should do..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tooltip Position
                  </label>
                  <select
                    value={currentStep.position}
                    onChange={(e) => setCurrentStep({ ...currentStep, position: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>

                <button
                  onClick={addStep}
                  className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
                >
                  Add Step
                </button>
              </div>

              {/* Steps List */}
              {steps.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Tour Steps ({steps.length})</h3>
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          <span className="font-medium text-gray-900">{step.title}</span>
                        </div>
                        <button
                          onClick={() => removeStep(step.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{step.content}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Target: <code className="bg-gray-100 px-1 rounded">{step.target}</code></span>
                        <span>Position: {step.position}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Generate Button */}
              {steps.length > 0 && tourName && (
                <button
                  onClick={generateWidget}
                  className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Generate Widget Code
                </button>
              )}
            </div>
          </div>

          {/* Right Panel - Preview & Code */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              <div className="bg-gray-50 rounded-lg p-8 min-h-[300px] flex items-center justify-center">
                {steps.length === 0 ? (
                  <p className="text-gray-400">Add steps to see preview</p>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎯</div>
                    <p className="text-gray-600">
                      {steps.length} step{steps.length !== 1 ? 's' : ''} configured
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Tour: {tourName || 'Untitled'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Generated Code */}
            {generatedCode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Embed Code</h3>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm"
                  >
                    Copy Code
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300">
                    <code>{generatedCode}</code>
                  </pre>
                </div>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 font-medium mb-2">
                    📋 Installation Instructions:
                  </p>
                  <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Copy the code above</li>
                    <li>Paste it before the closing &lt;/body&gt; tag in your HTML</li>
                    <li>The tour will automatically start when the page loads</li>
                  </ol>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
