import inquirer from 'inquirer';
import fs from 'fs/promises';
import path from 'path';

import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';

marked.setOptions({
  renderer: new TerminalRenderer()
});

const md = (text) => marked(text).replace(/\n{1,2}$/, '');

const envFilePath = path.join(process.cwd(), '.env');

async function main() {
  try {
    // Check if the variables exist in the .env file
    const envFileContent = await fs
      .readFile(envFilePath, 'utf-8')
      .catch(() => '');

    // Get the keys of variables that already exist
    const existingVars = [
      'POSTGRES_URL',
      'AUTH_GITHUB_ID',
      'AUTH_GITHUB_SECRET',
      'AUTH_SECRET',
      'OPENAI_API_KEY'
    ];

    // Print the variables that already exist and are in the list of variables to write
    const existingVarsToWrite = existingVars.filter((key) =>
      envFileContent.includes(key)
    );
    if (existingVarsToWrite.length > 0) {
      console.log(md('**The following variables already exist in .env:**'));
      console.log(existingVarsToWrite.map((key) => `- ${key}`).join('\n'));
      console.log(
        md('**Variables assigned a non-empty value will be overwritten.**') +
          '\n'
      );
    }

    // Step 1: Ask the user for the production URL
    const { databaseUrl } = await inquirer.prompt([
      {
        type: 'input',
        name: 'databaseUrl',
        message: 'What is your Postgres database URL?'
      }
    ]);

    // Step 2: Ask the user to select authentication methods needed (multiselect)
    const { authMethods } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'authMethods',
        message: 'Select the authentication methods needed:',
        choices: [{ name: 'GitHub', value: 1 }]
      }
    ]);

    let githubAuthId = '';
    let githubAuthSecret = '';
    let authSecret = '';
    if (authMethods.length) {
      console.log(
        md(
          'You can generate the following value here: _https://generate-secret.vercel.app/32_'
        )
      );
      // Step 3: Ask the user for the OPENAI_API_KEY
      authSecret = (
        await inquirer.prompt([
          {
            type: 'input',
            name: 'authSecret',
            message: 'What is your auth secret?'
          }
        ])
      ).authSecret;
      console.log(
        md(
          'You can find the following values in your GitHub settings here: _https://github.com/settings/developers_'
        )
      );
      // Step 3: Ask the user for the OPENAI_API_KEY
      githubAuthId = (
        await inquirer.prompt([
          {
            type: 'input',
            name: 'githubAuthToken',
            message: 'What is your GitHub client ID?'
          }
        ])
      ).githubAuthToken;
      githubAuthSecret = (
        await inquirer.prompt([
          {
            type: 'input',
            name: 'githubAuthSecret',
            message: 'What is your GitHub client secret?'
          }
        ])
      ).githubAuthSecret;
    }

    console.log(
      md(
        'You can generate OpenAI API keys here: _https://platform.openai.com/api-keys_'
      )
    );
    // Step 3: Ask the user for the OPENAI_API_KEY
    const { openaiApiKey } = await inquirer.prompt([
      {
        type: 'input',
        name: 'openaiApiKey',
        message: 'What is your OPENAI_API_KEY?'
      }
    ]);

    const envVars = {
      POSTGRES_URL: databaseUrl,
      AUTH_GITHUB_ID: githubAuthId,
      AUTH_GITHUB_Secret: githubAuthSecret,
      AUTH_SECRET: authSecret,
      OPENAI_API_KEY: openaiApiKey
    };

    // Filter out variables with blank values
    const variablesToWrite = Object.entries(envVars)
      .filter(([_, value]) => value.trim() !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    if (variablesToWrite) {
      console.log('The following variables will be written to .env:');
      console.log(variablesToWrite);
      const { writeToEnv } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'writeToEnv',
          message: 'Do you want to write these variables to .env?',
          default: true
        }
      ]);

      if (writeToEnv) {
        await fs.appendFile(
          envFilePath,
          '\n' + variablesToWrite + '\n',
          'utf-8'
        );
        console.log('Variables written to .env file successfully.');
      } else {
        console.log('Variables not written to .env file.');
      }
    } else {
      console.log('No variables were updated.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
