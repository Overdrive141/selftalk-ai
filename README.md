# SelfTalk AI

**Seek guidance from within**

SelfTalk AI is an open-source platform designed to enhance self-reflection and personal growth by leveraging the power of your own voice and internal dialogues. Developed by 141 Studios, it empowers individuals to explore self-awareness and mindfulness through AI-guided self-talk.

https://github.com/user-attachments/assets/b2b7a05b-d550-4d6c-a7b7-d0e2b9d59af7


## Features

- **AI-Powered Conversational Agent**: Integrates advanced language models, such as OpenAI's GPT-3.5, enabling dynamic, context-aware conversations for meaningful and adaptive self-reflection.

- **Real-Time Speech Recognition and Synthesis**: Employs accurate speech-to-text transcription and natural-sounding text-to-speech synthesis (via services like Eleven Labs), creating seamless conversational experiences.

- **Customizable AI Personas**: Offers selectable or customizable AI personas with distinct conversational styles, making self-reflection sessions personalized and engaging.

- **Emotion Recognition and Adaptive Responses**: Analyzes vocal tone and language patterns to detect emotional cues, enabling empathetic and supportive interactions.

- **Secure Data Handling and User Privacy**: Ensures all user data, including voice recordings and transcripts, is encrypted and securely stored, prioritizing user privacy and security.

- **Cross-Platform Accessibility**: Features a responsive design compatible with desktops, tablets, and smartphones, providing convenient access to self-reflection sessions anytime, anywhere.

- **Integration with External Well-being Resources**: Provides curated recommendations for articles, exercises, and professional services based on conversational insights, supporting continuous personal development.

- **Continuous Learning and Improvement**: Leverages machine learning to refine conversational capabilities from anonymized interaction data, continuously enhancing effectiveness.

## Installation

1. **Clone the Repository**:

```bash
git clone https://github.com/Overdrive141/selftalk-ai.git
```

2. **Navigate to the Project Directory**:

```bash
cd selftalk-ai
```

3. **Install Dependencies**:

Ensure you have [Node.js](https://nodejs.org/) installed. Install packages with:

```bash
npm install
```

4. **Set Up Environment Variables**:

Duplicate `.env.example` and rename it `.env`:

```bash
cp .env.example .env
```

Replace placeholder values with actual credentials:

```
POSTGRES_URL=your_postgres_url
POSTGRES_USER=your_postgres_user
POSTGRES_HOST=your_postgres_host
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DATABASE=your_postgres_database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ELEVEN_LABS_API_KEY=your_eleven_labs_api_key
OPENAI_API_KEY=your_openai_api_key
REPLICATE_API_TOKEN=your_replicate_api_token
APP_URL=your_application_url
```

**Note:** Secure your `.env` file, as it contains sensitive information.

## Usage

### Development Server

Start the server with:

```bash
npm run dev
```

Access at `http://localhost:3000`.

### Building for Production

Compile the application with:

```bash
npm run build
```

The compiled app will be in `.next`.

## Contributing

Contributions are welcome! To contribute:

1. **Fork the Repository**.
2. **Create a New Branch** (`git checkout -b feature-name`).
3. **Make Your Changes**.
4. **Commit Your Changes** (`git commit -m 'Description of feature or fix'`).
5. **Push to the Branch** (`git push origin feature-name`).
6. **Open a Pull Request**.

Ensure your code meets coding standards and includes tests.

## Disclaimer

SelfTalk AI serves as a supportive tool for self-reflection and personal growth. It is not a substitute for professional therapy or mental health advice. Seek professional help if experiencing significant emotional distress.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to all contributors and the open-source community.

© 2025 141 Studios. All rights reserved.

