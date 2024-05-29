import inquirer from 'inquirer';
import fs from 'fs/promises';
import path from 'path';

const envFilePath = path.join(process.cwd(), '.env');

async function main() {
  try {
    // Check if the variables exist in the .env file
    const envFileContent = await fs
      .readFile(envFilePath, 'utf-8')
      .catch(() => '');

    // Get the keys of variables that already exist
    const existingVars = ['PRODUCTION_URL', 'AUTH_METHODS', 'OPENAI_API_KEY'];

    // Print the variables that already exist and are in the list of variables to write
    const existingVarsToWrite = existingVars.filter((key) =>
      envFileContent.includes(key)
    );
    if (existingVarsToWrite.length > 0) {
      console.log('The following variables already exist in .env:');
      console.log(existingVarsToWrite.map((key) => `- ${key}`).join('\n'));
      console.log(
        'Variables assigned a non-empty value will be overwritten.\n'
      );
    }

    // Step 1: Ask the user for the production URL
    const { productionUrl } = await inquirer.prompt([
      {
        type: 'input',
        name: 'productionUrl',
        message: 'What is your production URL?'
      }
    ]);

    // Step 2: Ask the user to select authentication methods needed (multiselect)
    const { authMethods } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'authMethods',
        message: 'Select the authentication methods needed:',
        choices: [
          { name: 'Username/password', value: 0 },
          { name: 'Google', value: 1 },
          { name: 'Twitter', value: 2 },
          { name: 'GitHub', value: 3 }
        ]
      }
    ]);

    console.log("https://platform.openai.com/api-keys")
    // Step 3: Ask the user for the OPENAI_API_KEY
    const { openaiApiKey } = await inquirer.prompt([
      {
        type: 'input',
        name: 'openaiApiKey',
        message: 'What is your OPENAI_API_KEY?'
      }
    ]);

    const envVars = {
      PRODUCTION_URL: productionUrl,
      AUTH_METHODS: authMethods.join(','),
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
      console.log('All variables already exist in .env file.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
