<!-- PROJECT LOGO -->
<p align="center">
  <h3 align="center">Node zero CLI app</h3>
  <p align="center">
  A simplified CLI version of the Zero fasting android app build in Node
    <br/>
  </p>
</p>
<br/>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#initialisation">Initialisation</a></li>
        <li><a href="#docker">Docker</a></li>
      </ul>
    </li>
  </ol>
</details>
<br/>


<!-- ABOUT THE PROJECT -->
## About The Project

The features that it provides are the following:
* Start fast session.
* Check current fast session.
* End fast session.
* Update fast session.
* List all previous fast sessions.

### Built With

* [NodeJS](https://nodejs.dev/)


<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kikooOOoo16/node-zero-cli.git
   ```
3. Install NPM packages in both the NodeJS server and the Angular app root directories
   ```sh
   npm install
   ```
   
### Initialisation

1. To start the CLI, while in the app directory just run  :
   ```sh
   npm run start
   ```
   
### Docker

The app also has a Dockerfile and can be started with Docker. Inside the same directory as the Dockerfile run :
   ```sh
   docker build -t node-zero-cli:1
   docker run -it --name node-zero-cli-container dockerImageID
   ```
   
The Docker image for this app is also hosted on DockerHub [kristijan1/node-zero-cli](https://hub.docker.com/repository/docker/kristijan1/node-zero-cli)

<!-- CONTACT -->
## Contact

Kristijan Pavlevski - kristijan.pavlevski@outlook.com

Project Link: [https://github.com/kikooOOoo16/node-zero-cli.git](https://github.com/kikooOOoo16/node-zero-cli.git)
