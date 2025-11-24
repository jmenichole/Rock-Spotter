/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * AI Demo Page - Showcase AI-powered features
 */

import { useState } from 'react'
import RockIdentifier from '../components/RockIdentifier'
import { Sparkles, Info } from 'lucide-react'

const AIDemo = () => {
  const [identificationResult, setIdentificationResult] = useState(null)

  const handleIdentified = (result) => {
    setIdentificationResult(result)
    console.log('Rock identified:', result)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Rock Identification
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of rock spotting with our AI-powered identification system
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Info className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                How It Works
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>
                  <strong>1. Upload:</strong> Take or upload a photo of any rock
                </li>
                <li>
                  <strong>2. Analyze:</strong> Our AI analyzes the rock's visual features
                </li>
                <li>
                  <strong>3. Identify:</strong> Get detailed information about rock type, composition, and more
                </li>
                <li>
                  <strong>4. Learn:</strong> Discover geological facts and common uses
                </li>
              </ul>
              <p className="text-xs text-blue-700 mt-4">
                <strong>Note:</strong> This is a proof-of-concept. To enable real AI identification, 
                configure Vercel AI Gateway in your environment variables.
              </p>
            </div>
          </div>
        </div>

        {/* Rock Identifier Component */}
        <RockIdentifier onIdentified={handleIdentified} />

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Instant Results
            </h3>
            <p className="text-gray-600 text-sm">
              Get rock identification results in seconds, not hours
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Educational
            </h3>
            <p className="text-gray-600 text-sm">
              Learn about mineral composition, hardness, and geological age
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Smart Caching
            </h3>
            <p className="text-gray-600 text-sm">
              Results are cached to provide faster responses and reduce costs
            </p>
          </div>
        </div>

        {/* Integration Guide */}
        <div className="mt-12 bg-gray-900 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Integrate?</h3>
          <p className="text-gray-300 mb-6">
            Add Vercel AI Gateway to enable real AI-powered rock identification:
          </p>
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-green-400">
{`# .env.local
VITE_AI_GATEWAY_URL=https://your-ai-gateway.vercel.app/api/ai

# Install Vercel AI SDK
npm install @vercel/ai

# Configure your AI provider (OpenAI, Anthropic, etc.)
# Update the aiGateway.js to use real AI models`}
            </pre>
          </div>
        </div>

        {/* Debug Info (Development Only) */}
        {identificationResult && import.meta.env.DEV && (
          <details className="mt-8 bg-gray-100 rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-gray-700">
              Debug: Last Identification Result
            </summary>
            <pre className="mt-4 text-xs overflow-x-auto">
              {JSON.stringify(identificationResult, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}

export default AIDemo
