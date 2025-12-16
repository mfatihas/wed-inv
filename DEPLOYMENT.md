## Cloudflare Pages Deployment

This project is configured for deployment on Cloudflare Pages.

### Build Configuration

- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Node Version**: 20.x

### Deploy to Cloudflare Pages

1. **Via Cloudflare Dashboard:**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Connect your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Build output directory: `dist`
     - Environment variable: `NODE_VERSION=20`

2. **Via Wrangler CLI:**
   ```bash
   # Install Wrangler
   npm install -g wrangler

   # Login to Cloudflare
   wrangler login

   # Deploy
   npm run build
   wrangler pages deploy dist
   ```

### Custom Domain

After deployment, you can add a custom domain in the Cloudflare Pages dashboard under "Custom domains".
