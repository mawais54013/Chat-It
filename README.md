# CodeChat 

This application is a online live code editor using Liowebrtc, Pubnub ChatEngine, Codemirror, and Firebase. Users can either practice on their own or make web pages with others using this application. This application is useful for users to practice their coding skills, create awesome websites, and test each other to prepare for their career advancement. 

![index](Images/Screen1.png)
Main Page Above 

# Getting Started 

Site Link: [CodeChat](https://codechat-v1.herokuapp.com/)

After the main page, the user will be taken to the coding page where all of the magic takes place. A brief overview below shows areas for coding(JS, HTML, and CSS), video chat area, a chat area, and a timer. 

![codepage](Images/Screen2.png)

Codemirror is used to set up the Javascript, HTML, and CSS portions and the output is a html web page itself. Timer is an npm package that users can reset and test their coding skills against the clock. Video chat is used by utilizing Liowertc for connect between users with both audio and video features. The chat feature is Pubnub ChatEngine in case users want to post a link or suggestions. 

### Prerequisites

Your can access the site from any interest browser including [Google Chrome](https://www.google.com/chrome/), [Firefox](https://www.mozilla.org/en-US/firefox/new/), or [Safari](https://www.apple.com/safari/). 

# Deployment

This site is deployed through [heroku](https://codechat-v1.herokuapp.com/), and uses Firebase Database to store information of the code(HTML, CSS, and Javascript). Firebase is used as a live database to share code edits with each user in the same session. 

# Built With 
* React.js 
* Javascript/JQuery
* Firebase
* Material UI
* Heroku
* Yarn/Npm
  - Particle.js
  - Bootstrap
  - Chat-Engine
  - Codemirror
  - Liowebrtc
  - Random-key
  - Github-corner
  - Compound Timer
  - Copy to Clipboard
  - Pubnub

APIs and Libraries
* [Material-UI](https://material-ui.com/)

    React component that implements Google's Material Design 

* [React-Bootstrap](https://react-bootstrap.github.io/)
  
  Front end framework for react

# Wireframe and Layout

Built with react as the front end and the back end is node.js with Google's live firebase database for shared coding and live updates.
