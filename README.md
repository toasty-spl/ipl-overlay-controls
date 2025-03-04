# ipl-overlay-controls

[![CI](https://github.com/inkfarer/ipl-overlay-controls/actions/workflows/ci.yml/badge.svg)](https://github.com/inkfarer/ipl-overlay-controls/actions/workflows/ci.yml)

A [NodeCG](https://github.com/nodecg/nodecg) bundle. Provides dashboard panels for Inkling Performance Labs tournaments.

Visit the [documentation](https://ipl-overlay-controls.readthedocs.io/) to read how to use and develop overlays for ipl-overlay-controls.

## Install

1. Install [Node.js](https://nodejs.org/en/) - Using the LTS version (16.x as of writing) is recommended.

2. Install [Git](https://git-scm.com/)

3. Install [nodecg-cli](https://github.com/nodecg/nodecg-cli): `npm i -g nodecg-cli`

4. Create a directory for NodeCG: `mkdir nodecg && cd nodecg`

5. Install NodeCG: `nodecg setup`

6. Install ipl-overlay-controls: `nodecg install inkfarer/ipl-overlay-controls`.

* To specify a version, append `#<tag>` after the repository name.

  Example: `nodecg install inkfarer/ipl-overlay-controls#1.3.2`

  Find a list of the repository's releases [here](https://github.com/inkfarer/ipl-overlay-controls/releases). You can
  see the tag name next to the commit hash, located on the left-hand side of the page on desktop.

7. Configure the bundle at `<nodecg>/cfg/ipl-overlay-controls.json`. It should contain the following info:

```json
{
  "lastfm": {
    "apiKey": "Your last.fm API key",
    "secret": "Your last.fm API secret"
  },
  "smashgg": {
    "apiKey": "Your smash.gg API key"
  },
  "radia": {
    "url": "https://radia-production",
    "socketUrl": "wss://radia-websocket",
    "authentication": "Your Authentication Key"
  }
}
```

The "lastfm", "smashgg", "radia" sections may be omitted, though functionality will be missing if that is done.

8. In the NodeCG root, start NodeCG: `nodecg start`

9. Access the dashboard at `http://localhost:9090/` in your browser.

## Development

For development, a number of npm scripts are provided:

- `build` - Creates a production build of the bundle.
- `clean` - Deletes generated build files and npm cache.
- `cleanbuild` - Deletes generated files and runs a production build.
- `devbuild` - Creates a development build of the bundle.
- `start` - Starts NodeCG.
- `watch` - Runs a development build when code changes are detected.
- `schema-types` - Generates TS type definitions for replicant schemas (Defined in the `/schemas` directory)
- `lint` - Runs ESLint to check for code issues.
- `fix` - Automatically fixes some ESLint errors
- `test` - Runs unit tests
- `test:update` - Runs unit tests while updating snapshots
- `test:ci` - Runs unit tests and creates a result file for Continuous Integration systems to parse

This repository uses GitHub actions to automatically verify with ESLint and create builds from the master branch. 
New releases should be created off the `build` branch, which contains the built files.

### Debugging extensions in JetBrains IDEs

To help debug this bundle in JetBrains IDEs, create a Node.js build configuration with the following options:

- **Working directory**: [nodecg]\bundles\ipl-overlay-controls 
- **JavaScript file**: [nodecg]\index.js 

To create a debuggable development build, run `npm run watch` or `npm run devbuild` in the project root.
