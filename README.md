# Bodhi: Markdown Document Management and Visualization Platform

Bodhi is a Vue.js-based web application designed to provide efficient Markdown document management and visualization features, helping users better organize and understand their content.

## Table of Contents

- [Bodhi: Markdown Document Management and Visualization Platform](#bodhi-markdown-document-management-and-visualization-platform)
  - [Table of Contents](#table-of-contents)
  - [Main Features](#main-features)
  - [Quick Start](#quick-start)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)
  - [Project Structure](#project-structure)
  - [License](#license)

## Main Features

- **Markdown Editor**: Supports real-time previews and advanced formatting, including images, code blocks, tables, and hyperlinks.
- **Knowledge Visualization**: Offers tools like mind maps, tree diagrams, fishbone diagrams, and more to help users better organize and understand their documents.
- **Multi-Document Management**: Supports file tree structure management and batch operations, enabling version control and efficient organization.
- **Advanced Search and Navigation**: Provides quick search by tags, keywords, and categories, along with intuitive navigation in visualization views.
- **User Management and Security**: Supports login, registration, and multi-factor authentication (MFA), with role-based access control (RBAC) and data encryption.

## Quick Start

### Prerequisites

- **Node.js**: Version 14.x or later.
- **Yarn**: As the package manager.

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Shize-ZHANG/Bodhi-V1.git
   cd Bodhi-V1
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   ```

3. **Run the development server**:

   ```bash
   yarn serve
   ```

   Open `http://localhost:8081` in your browser to view the application.

4. **Build for production**:

   ```bash
   yarn build
   ```

5. **Lint and format code**:

   ```bash
   yarn lint
   ```

## Project Structure

```plaintext
├── public/                 # Public resources
├── src/
│   ├── assets/             # Static assets
│   ├── components/         # Vue components
│   ├── views/              # View pages
│   ├── router/             # Router configuration
│   ├── store/              # Vuex state management
│   ├── App.vue             # Main component
│   └── main.js             # Entry point
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── babel.config.js         # Babel configuration
├── package.json            # Project dependencies and scripts
├── vue.config.js           # Vue CLI configuration
└── README.md               # Project documentation
```

## License

This project is open-sourced under the [MIT License](./LICENSE).