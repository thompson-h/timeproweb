# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

This repository hosts the privacy policy for the TimePro iOS app, served as a static website via GitHub Pages. The privacy policy is accessible from within the TimePro app and provides users with information about data collection and usage practices.

## Architecture

The project consists of:
- `index.html`: The main privacy policy page with automatic language detection and dynamic content loading
- `translations/`: JSON files containing privacy policy content in different languages (en.json, pt.json, es.json)
- `config.js`: Global configuration constants (email, effective date)
- `serve.sh`: Development server script for local testing
- Static HTML deployment via GitHub Pages (no build process required)

## Key Information

- **Deployment**: Changes to `index.html` are automatically published to GitHub Pages when committed to the main branch
- **Localization**: Automatic language detection based on browser settings (supports English, Portuguese, Spanish)
- **Styling**: Uses inline CSS with Apple-inspired design system fonts and responsive layout
- **Contact**: thompson.costa@icloud.com for questions or concerns
- **Effective Date**: Privacy policy is effective as of 2025-05-31
- **Local Development**: Use http://localhost:8000 for testing (run `./serve.sh` to start server)

## Common Tasks

- **Update privacy policy content**: Modify the JSON files in the `translations/` folder for the respective languages
- **Add new language**: Create new JSON file in `translations/` and add language mapping to `SUPPORTED_LANGUAGES` in `index.html`
- **Update effective date**: Change the date in `config.js`
- **Update contact email**: Change the email in `config.js`
- **Local testing**: Run `./serve.sh` and access http://localhost:8000
- **Deploy changes**: Simply commit changes to the main branch - GitHub Pages handles deployment automatically
