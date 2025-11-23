const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rock Spotter API',
      version: '1.0.0',
      description:
        'A platform for rock enthusiasts to share photos, participate in hunts, and earn achievements',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        name: 'Rock Spotter',
        url: 'https://github.com/jmenichole/Rock-Spotter',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
      {
        url: 'https://rock-spotter.vercel.app/api',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
            },
            username: {
              type: 'string',
              minLength: 3,
              description: 'Username',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address',
            },
            profilePicture: {
              type: 'string',
              description: 'Profile picture URL',
            },
            bio: {
              type: 'string',
              maxLength: 500,
              description: 'User bio',
            },
            rockCount: {
              type: 'number',
              description: 'Number of rocks posted',
            },
            huntCount: {
              type: 'number',
              description: 'Number of hunts completed',
            },
            role: {
              type: 'string',
              enum: ['user', 'moderator', 'admin'],
              description: 'User role',
            },
          },
        },
        Rock: {
          type: 'object',
          required: ['title', 'location'],
          properties: {
            _id: {
              type: 'string',
              description: 'Rock ID',
            },
            title: {
              type: 'string',
              description: 'Rock title',
            },
            description: {
              type: 'string',
              description: 'Rock description',
            },
            photo: {
              type: 'string',
              description: 'Photo URL',
            },
            location: {
              type: 'object',
              description: 'GeoJSON Point',
              properties: {
                type: {
                  type: 'string',
                  enum: ['Point'],
                },
                coordinates: {
                  type: 'array',
                  items: {
                    type: 'number',
                  },
                  minItems: 2,
                  maxItems: 2,
                },
              },
            },
            rockType: {
              type: 'string',
              enum: ['igneous', 'sedimentary', 'metamorphic', 'mineral', 'fossil', 'other'],
              description: 'Type of rock',
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Rock tags',
            },
            likes: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'User IDs who liked',
            },
            isPublic: {
              type: 'boolean',
              description: 'Visibility status',
            },
          },
        },
        Hunt: {
          type: 'object',
          required: ['title', 'difficulty'],
          properties: {
            _id: {
              type: 'string',
              description: 'Hunt ID',
            },
            title: {
              type: 'string',
              description: 'Hunt title',
            },
            description: {
              type: 'string',
              description: 'Hunt description',
            },
            difficulty: {
              type: 'string',
              enum: ['easy', 'medium', 'hard'],
              description: 'Hunt difficulty',
            },
            rocks: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  rock: {
                    type: 'string',
                    description: 'Rock ID',
                  },
                  hint: {
                    type: 'string',
                    description: 'Hint for finding the rock',
                  },
                  order: {
                    type: 'number',
                    description: 'Order in the hunt',
                  },
                },
              },
            },
            isActive: {
              type: 'boolean',
              description: 'Whether hunt is active',
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              description: 'Hunt start date',
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              description: 'Hunt end date',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

module.exports = swaggerJsdoc(options);
