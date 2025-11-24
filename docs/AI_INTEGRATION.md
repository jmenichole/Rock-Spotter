# AI Gateway Integration Guide

## Overview

Rock Spotter integrates with Vercel AI Gateway to provide AI-powered features:

- **Rock Identification**: Upload photos and get instant rock type identification
- **Description Enhancement**: AI-generated descriptions for rock posts
- **Duplicate Detection**: Find similar rocks in the database
- **Smart Search**: Natural language search queries

## Setup

### 1. Install Dependencies

```bash
cd frontend
npm install @vercel/ai ai
```

### 2. Configure Environment Variables

Create `.env.local` in the frontend directory:

```env
# Vercel AI Gateway URL
VITE_AI_GATEWAY_URL=https://your-project.vercel.app/api/ai

# Optional: Direct AI Provider (if not using gateway)
VITE_OPENAI_API_KEY=sk-...
```

### 3. Deploy AI Gateway Functions

Create API routes in your Vercel project:

```typescript
// api/ai/identify-rock.ts
import { OpenAI } from 'openai'

export default async function handler(req, res) {
  const { image } = req.body
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: 'Identify this rock type and provide details about its composition, age, and characteristics.' },
        { type: 'image_url', image_url: { url: image } }
      ]
    }],
    max_tokens: 500
  })

  // Parse AI response and return structured data
  res.json({
    rockType: '...',
    confidence: 0.95,
    description: '...',
    // ... more fields
  })
}
```

## Usage

### Rock Identification Component

```jsx
import RockIdentifier from '../components/RockIdentifier'

function MyPage() {
  const handleIdentified = (result) => {
    console.log('Identified:', result.rockType)
  }

  return <RockIdentifier onIdentified={handleIdentified} />
}
```

### Direct API Usage

```javascript
import { identifyRock } from '../utils/aiGateway'

// Identify from image URL
const result = await identifyRock('https://example.com/rock.jpg')

// Identify from base64
const result = await identifyRock('data:image/jpeg;base64,...')
```

## Features

### Caching

Results are automatically cached in localStorage for 24 hours to:
- Reduce API costs
- Improve response times
- Work offline for previously identified rocks

### Demo Mode

When AI Gateway is not configured, the system falls back to demo data:
- Shows example identification results
- Allows testing UI without API costs
- Displays a notice that AI features are not enabled

### Error Handling

The system gracefully handles errors:
- Network failures → Returns demo data
- Invalid images → User-friendly error message
- Rate limits → Queues requests

## Cost Optimization

1. **Caching**: 24-hour cache reduces repeat identifications
2. **Image Optimization**: Compress images before sending to AI
3. **Rate Limiting**: Prevent abuse with user quotas
4. **Batch Processing**: Group multiple identifications

## Testing

Run the demo page:

```bash
npm run dev
# Navigate to /ai-demo
```

## Production Checklist

- [ ] Configure VITE_AI_GATEWAY_URL
- [ ] Set up Vercel AI Gateway functions
- [ ] Add API key to Vercel environment variables
- [ ] Test with real images
- [ ] Monitor API usage and costs
- [ ] Set up rate limiting
- [ ] Configure caching strategy

## Troubleshooting

**Issue**: "AI Gateway not configured" message

**Solution**: Set `VITE_AI_GATEWAY_URL` in `.env.local`

---

**Issue**: Slow identification

**Solution**: Check image size, compress before upload

---

**Issue**: High API costs

**Solution**: Verify caching is working, check for duplicate requests

## Examples

See `frontend/src/pages/AIDemo.jsx` for a complete working example.

## Support

For AI Gateway issues, refer to:
- [Vercel AI Documentation](https://sdk.vercel.ai/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
