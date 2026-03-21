import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Artful Roots Co | Premium NestJS Boilerplate</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #6366f1;
            --secondary: #a855f7;
            --bg: #0f172a;
            --text: #f8fafc;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Outfit', sans-serif;
            background-color: var(--bg);
            color: var(--text);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
        }

        .background-blob {
            position: absolute;
            width: 500px;
            height: 500px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            filter: blur(80px);
            border-radius: 50%;
            z-index: -1;
            animation: move 20s infinite alternate;
        }

        @keyframes move {
            from { transform: translate(-20%, -20%); }
            to { transform: translate(20%, 20%); }
        }

        .glass-container {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 3rem;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            max-width: 600px;
            transition: transform 0.3s ease;
        }

        .glass-container:hover {
            transform: translateY(-5px);
        }

        h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(to right, #fff, #94a3b8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 600;
        }

        p {
            font-size: 1.2rem;
            line-height: 1.6;
            color: #94a3b8;
            margin-bottom: 2rem;
        }

        .badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 100px;
            color: var(--primary);
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
        }

        .cta-button {
            display: inline-block;
            padding: 1rem 2.5rem;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            color: white;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .cta-button:hover {
            opacity: 0.9;
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <div class="background-blob"></div>
    <div class="glass-container">
        <div class="badge">Vercel Ready &middot; NestJS Powered</div>
        <h1>Artful Roots</h1>
        <p>Your premium boilerplate for scalable backend applications. Designed for performance, built for the future.</p>
        <a href="#" class="cta-button">Explore Documentation</a>
    </div>
</body>
</html>
    `;
  }
}
