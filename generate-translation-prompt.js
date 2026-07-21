#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const LANGUAGE_NAMES = {
    'zh-Hans': 'Simplified Chinese', 
    'zh-Hant': 'Traditional Chinese',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'ru': 'Russian',
    'pt': 'Brazilian Portuguese',
    'es': 'Spanish'
};

async function generateTranslationPrompt(targetLang) {
    const langName = LANGUAGE_NAMES[targetLang] || targetLang;
    
    // Load English source
    const enContent = await fs.readFile('./translations/en.json', 'utf8');
    const enTranslation = JSON.parse(enContent);
    
    // Create prompt for AI
    const prompt = `Please translate the following privacy policy from English to ${langName}.

Important guidelines:
1. Maintain the exact same JSON structure
2. Keep all {{email}} and {{date}} placeholders unchanged
3. Translate naturally, not word-for-word
4. Use formal, legal language appropriate for privacy policies
5. For the "languageName" field, use the native name of the language
6. Keep the "language" field as "${targetLang}"

Here's the English content to translate:

\`\`\`json
${JSON.stringify(enTranslation, null, 2)}
\`\`\`

Please provide only the translated JSON, without any additional explanation.`;

    // Save prompt to file
    const promptFile = `translation-prompt-${targetLang}.txt`;
    await fs.writeFile(promptFile, prompt, 'utf8');
    
    console.log(`✅ Translation prompt saved to: ${promptFile}`);
    console.log(`\n📋 Next steps:`);
    console.log(`1. Copy the content of ${promptFile}`);
    console.log(`2. Paste it into your preferred AI tool (ChatGPT, Claude, etc.)`);
    console.log(`3. Save the translated JSON to translations/${targetLang}.json`);
    console.log(`4. Test with: ./serve.sh and visit http://localhost:8000`);
}

async function listPendingTranslations() {
    try {
        const files = await fs.readdir('./translations');
        const existing = files.filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
        
        const pending = [];

        for (const lang of Object.keys(LANGUAGE_NAMES)) {
            if (!existing.includes(lang)) {
                pending.push(lang);
                continue;
            }

            try {
                const content = await fs.readFile(`./translations/${lang}.json`, 'utf8');
                if (content.includes('[TRANSLATION NEEDED]')) {
                    pending.push(lang);
                }
            } catch {
                pending.push(lang);
            }
        }
        
        if (pending.length > 0) {
            console.log('📋 Languages needing translation:');
            pending.forEach(lang => {
                const name = LANGUAGE_NAMES[lang];
                console.log(`   - ${lang}: ${name}`);
            });
            console.log(`\n💡 Usage: node generate-translation-prompt.js [language-code]`);
            console.log(`   Example: node generate-translation-prompt.js fr`);
        } else {
            console.log('✅ All translations are complete!');
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// Main CLI
async function main() {
    const args = process.argv.slice(2);
    const targetLang = args[0];
    
    if (!targetLang) {
        await listPendingTranslations();
        return;
    }
    
    if (!LANGUAGE_NAMES[targetLang]) {
        console.log(`❌ Language "${targetLang}" not supported.`);
        console.log('Available languages:', Object.keys(LANGUAGE_NAMES).join(', '));
        return;
    }
    
    try {
        await generateTranslationPrompt(targetLang);
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

main();
