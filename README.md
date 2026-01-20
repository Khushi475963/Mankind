# J.C. Juneja Hospital - Clinical Triage Portal

A professional clinical triage and patient services portal built with React, Tailwind CSS, and Google Gemini (MedLM).

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set up Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

3. **Run Dev Server**:
   ```bash
   npm run dev
   ```

## Vercel Deployment

1. **Push to GitHub**: Upload your code to a repository.
2. **Connect to Vercel**: Import the repository into Vercel.
3. **Configure Environment Variable**:
   - Go to Project Settings > Environment Variables.
   - Add a new variable named `API_KEY`.
   - Paste your Gemini API key as the value.
4. **Deploy**: Vercel will automatically detect the Vite project and build it.

## Features
- **Eli AI Triage**: 24/7 Clinical Triage Assistant.
- **Multi-language Support**: English, Hindi, and Hinglish.
- **Family Digital Twin**: Longitudinal health records stored locally.
- **Facility Directory**: Real-time hospital infrastructure information.
