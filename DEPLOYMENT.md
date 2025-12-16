## Cloudflare Pages Deployment

This project is configured for deployment on Cloudflare Pages.

### Build Configuration

- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Node Version**: 20.x or higher

> **Note**: For Cloudflare Pages dashboard deployments, use **only** `npm run build` as the build command. The deployment is handled automatically by Cloudflare.

### Deploy to Cloudflare Pages

1. **Via Cloudflare Dashboard (Recommended):**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Connect your GitHub repository
   - Configure build settings:
     - **Framework preset**: None
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
   - Click "Save and Deploy"
   - Cloudflare will automatically build and deploy your site!

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
