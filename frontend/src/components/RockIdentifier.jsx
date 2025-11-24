/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * RockIdentifier Component - AI-powered rock identification
 */

import { useState } from 'react'
import { Camera, Sparkles, Loader2, Info, CheckCircle2 } from 'lucide-react'
import { identifyRock } from '../utils/aiGateway'

/**
 * RockIdentifier - AI-powered rock identification from images
 * 
 * @example
 * <RockIdentifier onIdentified={(result) => console.log(result)} />
 */
const RockIdentifier = ({ onIdentified }) => {
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [identifying, setIdentifying] = useState(false)
  const [result, setResult] = useState(null)

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
      setImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleIdentify = async () => {
    if (!image) return

    setIdentifying(true)
    setResult(null)

    try {
      const identification = await identifyRock(image)
      setResult(identification)
      
      if (onIdentified) {
        onIdentified(identification)
      }
    } catch (error) {
      console.error('Identification error:', error)
    } finally {
      setIdentifying(false)
    }
  }

  const handleReset = () => {
    setImage(null)
    setImagePreview(null)
    setResult(null)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-6 w-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">AI Rock Identifier</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Upload a photo of a rock and our AI will identify it for you!
      </p>

      {/* Upload Area */}
      {!imagePreview && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="rock-image-upload"
          />
          <label
            htmlFor="rock-image-upload"
            className="cursor-pointer flex flex-col items-center space-y-4"
          >
            <Camera className="h-12 w-12 text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-900">
                Upload rock photo
              </p>
              <p className="text-sm text-gray-500 mt-1">
                PNG, JPG up to 10MB
              </p>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Choose File
            </button>
          </label>
        </div>
      )}

      {/* Image Preview */}
      {imagePreview && !result && (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Rock to identify"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleIdentify}
              disabled={identifying}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {identifying ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Identifying...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Identify Rock</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleReset}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="relative mb-4">
            <img
              src={imagePreview}
              alt="Identified rock"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          {result.isDemo && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
              <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Demo Mode</p>
                <p className="text-yellow-700 mt-1">{result.note}</p>
              </div>
            </div>
          )}

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">
                Identified: {result.rockType}
              </h3>
            </div>
            
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-700">Confidence:</p>
                <div className="mt-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {(result.confidence * 100).toFixed(0)}% confident
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Description:</p>
                <p className="text-gray-600 mt-1">{result.description}</p>
              </div>

              {result.mineralComposition && (
                <div>
                  <p className="font-medium text-gray-700">Mineral Composition:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {result.mineralComposition.map((mineral, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                      >
                        {mineral}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.hardness && (
                <div>
                  <p className="font-medium text-gray-700">Hardness:</p>
                  <p className="text-gray-600">{result.hardness}</p>
                </div>
              )}

              {result.uses && (
                <div>
                  <p className="font-medium text-gray-700">Common Uses:</p>
                  <p className="text-gray-600">{result.uses.join(', ')}</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Identify Another Rock
          </button>
        </div>
      )}
    </div>
  )
}

export default RockIdentifier
