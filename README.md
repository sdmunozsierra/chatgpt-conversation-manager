# Project Title

ChatGPT Conversation Management

## Description

This project provides scripts to manage ChatGPT conversations via the backend API. It includes functionalities to fetch, save, delete, and parse conversations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [deleteAllConversations](#deleteallconversations)
  - [fetchConversations](#fetchconversations)
  - [saveAllConversations](#saveallconversations)
  - [parseConvos](#parseconvos)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/chatgpt-convo-management.git
   cd chatgpt-convo-management
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `globals.js` file in the project root with the following content:
   ```js
   export const HEADERS = {
       'Authorization': 'Bearer YOUR_API_KEY'
   };
   ```

## Usage

### deleteAllConversations

Marks all conversations as deleted.

#### Running the script
```sh
node deleteAllConversations.js
```

#### Script Explanation
- **URL**: `https://chatgpt.com/backend-api/conversations`
- **Method**: `PATCH`
- **Body**: `{"is_visible": false}`
- **Headers**: Authorization header from `globals.js`

The script makes a PATCH request to mark all conversations as not visible.

### fetchConversations

Fetches conversations from the ChatGPT backend API.

#### Running the script
```sh
node fetchConversations.js
```

#### Script Explanation
- **URL**: `https://chatgpt.com/backend-api/conversations?offset=0&limit=28&order=updated`
- **Method**: `GET`
- **Headers**: Authorization header from `globals.js`

The script fetches conversations with pagination and logs the fetched conversations.

### saveAllConversations

Fetches and saves all conversations to `convos.json`.

#### Running the script
```sh
node saveAllConversations.js
```

#### Script Explanation
- Fetches conversations in batches of 28 until all conversations are retrieved.
- Saves the retrieved conversations to `convos.json`.

### parseConvos

Parses the saved conversations and fetches detailed information for each conversation, saving them into separate JSON files.

#### Running the script
```sh
node parseConvos.js
```

#### Script Explanation
- Reads `convos.json`.
- Fetches detailed information for each conversation.
- Saves each conversation into a separate JSON file named with the conversation title and timestamp.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
