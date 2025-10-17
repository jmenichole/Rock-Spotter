/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Home Page - Landing page showcasing the social features of Rock Spotter
 */

import { Link } from 'react-router-dom'
import { Camera, Map, Trophy, Users, Mountain, ArrowRight, Heart, MessageCircle, Share2 } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Social Feed",
      description: "Follow fellow rock enthusiasts, like and comment on discoveries, and join discussions about geology."
    },
    {
      icon: <Camera className="h-8 w-8 text-blue-600" />,
      title: "Share Your Finds",
      description: "Post photos of your geological discoveries with detailed descriptions, locations, and connect with the community."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-green-600" />,
      title: "Join Discussions",
      description: "Engage in conversations about rock types, formation processes, and share your geological knowledge."
    },
    {
      icon: <Map className="h-8 w-8 text-purple-600" />,
      title: "Rock Hunts & Adventures",
      description: "Participate in community-organized rock hunting expeditions and geological exploration events."
    }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-4">
          <Mountain className="h-10 w-10 text-primary-600" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Welcome to <span className="text-primary-600">Rock Spotter</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The social platform where rock enthusiasts share discoveries, connect with fellow geologists, 
          and build a thriving community around the fascinating world of rocks and minerals!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/register"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Join the Community
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link 
            to="/feed"
            className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors"
          >
            Explore Feed
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Social Rock Discovery</h2>
          <p className="text-gray-600">Connect, share, and explore the geological world together</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600">Get started in three simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">1</div>
            <h3 className="text-xl font-semibold">Join & Connect</h3>
            <p className="text-gray-600">Create your profile and start following fellow rock enthusiasts in your area</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">2</div>
            <h3 className="text-xl font-semibold">Share & Discover</h3>
            <p className="text-gray-600">Post photos of your finds, engage with community posts, and discover amazing geology</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">3</div>
            <h3 className="text-xl font-semibold">Learn & Explore</h3>
            <p className="text-gray-600">Join discussions, participate in hunts, and expand your geological knowledge</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gray-100 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join the Rock Community?</h2>
        <p className="text-gray-600 mb-6">Connect with thousands of geology enthusiasts sharing their passion for rocks</p>
        <Link 
          to="/register"
          className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          Start Sharing Today
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}

export default Home