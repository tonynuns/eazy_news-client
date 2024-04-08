# Project Title
EazyNews


## Overview
EazyNews is a news aggregator that provides access to top headline news across the world in a simple layout that is easy to read; readers can interact with news articles of their choosing by liking them and/or adding comments


### Problem
News articles are usually presented in formats that have a lot of intentional distractions for the reader ranging from the page's styling, ads, and popups. This can be very annoying for news enthusiasts who just want to read the news without having to click severally to shut off these distractions. This makes reading news articles longer, with occasional sojourns into 'rabbit holes' as it were, when ads or popups are accidentally clicked


### User Profile
News enthusiasts who are:
- curious and who seek to stay informed about current events and developments from around the world
- keen on exploring a wide range of topics and perspectives in various fields, including business, entertainment, technology, science, health, and more
- time-conscious, value efficiency and prefer shorter, more concise news summaries that provide essential information quickly
- digital savvy and comfortable using digital platforms, websites, and mobile apps to access news content
- actively engaged in their communities and like to add their voices to news articles in the form of comments


### Features
- As a user, I want to be able to read current top headline news from around the world
- As a user, I want to be able to read past top headline news from around the world
- As a user, I want to be able to filter top headline news by categories
- As a user, I want to be able to search for news articles based on words within the title or description
- As a user, I want to be able to see the number of views a news article has
- As a user, I want to be able to see the number of likes a news article has
- As a user, I want to be able to see and read comments under news articles that have been written by me and other users

- As a user, I want to be able to create an account
- As a user, I want to be able to login to my account and manage my user profile
- As a user, I want to be able to login to my account and interact with news articles

- As a logged in user, I want to be able to 'like' a news article
- As a logged in user, I want to be able write comments under a news article
- As a logged in user, I want to be able to delete my comments under a news article
- As a logged in user, I want to be able to edit my comments under a news article


## Implementation

### Tech Stack
- React
- Javascript
- Express
- MySQL
- Client libraries
  - react
  - react-router
  - react-router-dom
  - axios
- Server libraries
  - knex
  - express
  - cors
  - uuid
  - jsonwebtoken
  - bcrypt for passwork hashing
  - jsdom for parsing and interacting with assembled HTML
  - @mozilla/readability for removing web page clutter


### APIs
- NewsAPI (newsapi.org)


### Sitemap
- Home Page: card list view of current news articles summary
- News Categeory: card list view of news articles summary filtered by selected category
- News Archive: card list view of news articles summary filtered by the date range between a 'from date' and a 'to date'
- News Articles details: full content of news articles and also showing source, author, views, likes, and comments
- Sign Up: User registration
- Login: User sign-in


### Mockups

- Home page
  [Home Page](./Mock%20Ups/EazyNews%20-%20Home%20Page.png)

- Archive Page
  [Archive Page](./Mock%20Ups/EazyNews%20-%20Archive%20Page.png)

- News Article Detail
  [News Article Detail](./Mock%20Ups/EazyNews%20-%20News%20Article%20Detail.png)

- Add Comment: accessible only to logged in users who can also delete own comment
  [Add Comment](./Mock%20Ups/EazyNews%20-%20Add%20Comment.png)

- Sign Up
  [Sign Up](./Mock%20Ups/EazyNews%20-%20Sign%20Up.png)

- Login
  [Login](./Mock%20Ups/EazyNews%20-%20Login.png)


### Data
- Data
  [Data](./Mock%20Ups/EazyNews%20-%20Data.png)


### Endpoints

**External API (NewsAPI)**
  - Call within the server every hour, perform data manipulation, and store in database

  **GET /v2/top-headlines?language=en&apiKey=API_KEY**
    - top headline news in the english language
    - Example Response:
    {
        "status": "ok",
        "totalResults": 37,
        "articles": [
            {
                "source": {
                "id": "cnn",
                "name": "CNN"
                },
                "author": "Fidel Gutiérrez, Heather Chen, David Shortell",
                "title": "‘Outrage against international law’: Mexico breaks diplomatic ties with Ecuador over embassy raid - CNN",
                "description": "Mexico has announced that it is breaking diplomatic ties with Ecuador after police raided its embassy in Quito to arrest former Ecuadorian Vice President Jorge Glas.",
                "url": "https://www.cnn.com/2024/04/06/americas/ecuador-vice-president-arrest-mexico-embassy-diplomatic-tensions-intl-hnk/index.html",
                "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2133957216.jpg?c=16x9&q=w_800,c_fill",
                "publishedAt": "2024-04-06T23:16:00Z",
                "content": "Mexico is breaking diplomatic ties with Ecuador after police raided its embassy in Quito to arrest former Ecuadorian Vice President Jorge Glas, who had been seeking asylum there.Confirming the move… [+5811 chars]"
            },
            {
                ...
            }
        ]
    }

  **GET /v2/top-headlines/sources?apiKey=API_KEY**
    - sources of top headline news matching source name and category
    - Example Response:
    {
        "status": "ok",
        "sources": [
            {
                "id": "abc-news",
                "name": "ABC News",
                "description": "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
                "url": "https://abcnews.go.com",
                "category": "general",
                "language": "en",
                "country": "us"
            },
            {
                "id": "abc-news-au",
                "name": "ABC News (AU)",
                "description": "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
                "url": "https://www.abc.net.au/news",
                "category": "general",
                "language": "en",
                "country": "au"
            },
            {
                ...
            }
        ]
    }

**Internal API**

  **POST /users/signup**
  - Add a user account
  - Parameters:
    {
        first_name: user_firstName,
        last_name: user_lastName,
        email: user_email,
        password: user_password
    }

  - Example Response:
    {
        success: true;
    }

  **POST /users/login**
  - Login a user
  - Parameters:
    {
        email: user_email,
        password: user_password
    }

  - Example Response:
    - if success
    {
        "token": TOKEN
    }
    
    - if error
    {
        "error": {
            "message": "Invalid email or password"
        }
    }

  **GET /users/profile**
  - Retrieve user information
  - Parameters
    {
        headers: {
            Authorization: `Bearer ${TOKEN}`;
        }
    }
  - Example Response:
    {
        "iat": 1712456552000, 
        "name:: "Michael"
    }
  
  **GET /**
  - Get current top headline news updated in the database in the last 24 hours
  - Parameters: none
  - Example Response:
    [
        {
            "id": 1,
            "source": "CNN",
            "author": "David Shortell",
            "date": 1712456552000
            "title": "‘Outrage against international law’: Mexico breaks diplomatic ties with Ecuador over embassy raid - CNN",
            "category": "Technology",
            "summary": "Mexico has announced that it is breaking diplomatic ties with Ecuador after police raided its embassy in Quito to arrest former Ecuadorian Vice President Jorge Glas.",
            "image": "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2133957216.jpg?c=16x9&q=w_800,c_fill",
            "content": "Mexico is breaking diplomatic ties with Ecuador after police raided its embassy in Quito to arrest former Ecuadorian Vice President Jorge Glas, who had been seeking asylum there.Confirming the move… [+5811 chars]",
            "views": 5,
            "likes": 2
        }
        {
            ...
        }
    ]

  **GET /:id**
  - Get details of top headline news with the specified id
  - Parameters: none
  - Example Response:
    {
        "id": 1,
        "source": "CNN",
        "author": "David Shortell",
        "date": 1712456552000
        "title": "‘Outrage against international law’: Mexico breaks diplomatic ties with Ecuador over embassy raid - CNN",
        "category": "Technology",
        "summary": "Mexico has announced that it is breaking diplomatic ties with Ecuador after police raided its embassy in Quito to arrest former Ecuadorian Vice President Jorge Glas.",
        "image": "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2133957216.jpg?c=16x9&q=w_800,c_fill",
        "content": "Mexico is breaking diplomatic ties with Ecuador after police raided its embassy in Quito to arrest former Ecuadorian Vice President Jorge Glas, who had been seeking asylum there.Confirming the move… [+5811 chars]",
        "views": 5,
        "likes": 2
        "comments": [
            {
                "id": 1,
                "name": "James",
                "comment": "This is great news",
                "timestamp": 1712456552000
            },
            {
                ...
            }
        ]
    }

  **GET /archive**
  - Get top headline news updated in the database between the time range passed in the request body
  - Parameters:
    {
        from: 1709605352000,
        to: 1712283752000
    }

  - Example Response:
    [
        {
            "id": 1,
            "source": "CNN",
            "author": "David Shortell",
            "date": 1710037352000
            "title": "‘Outrage against international law’: Mexico breaks diplomatic ties with Ecuador over embassy raid - CNN",
            "category": "Technology",
            "summary": "Mexico has announced that it is breaking diplomatic ties with Ecuador after police raided its embassy in Quito to arrest former Ecuadorian Vice President Jorge Glas.",
            "image": "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2133957216.jpg?c=16x9&q=w_800,c_fill",
            "content": "Mexico is breaking diplomatic ties with Ecuador after police raided its embassy in Quito to arrest former Ecuadorian Vice President Jorge Glas, who had been seeking asylum there.Confirming the move… [+5811 chars]",
            "views": 5,
            "likes": 2
        }
        {
            ...
        }
    ]

  **PUT /:id/views**
  - Increment the views count of a news article by 1
  - Parameters: none
  - Example Response:
    {
        "id": 1,
        "views": 5
    }

  **PUT /:id/likes**
  - Increment the likes count of a news article by 1; only logged in users have access to this endpoint
  - Parameters
    {
        headers: {
            Authorization: `Bearer ${TOKEN}`;
        }
    }

  - Example Response:
    {
        "id": 1,
        "likes": 3
    }

  **POST /:id/comments**
  - Add comments to a news article; only logged in users have access to this endpoint
  - Parameters
    {
        name: "John",
        comment: "This is a sample comment"
    },
    {
        headers: {
            Authorization: `Bearer ${TOKEN}`;
        }  
    }

  - Example Response:
        {
            "id": 3,
            "name": "John",
            "comment": "This is a sample comment",
            "timestamp": 1712456552000
        }

  **DELETE /:id/comments/commentId**
  - Delete existing comments to a news article; only logged in users have access to this endpoint
  - Parameters
    {
        headers: {
            Authorization: `Bearer ${TOKEN}`;
        }  
    }

  - Example Response: none


### Auth
- JWT auth
  - use the jsonwebtoken library in the server
  - when a user logs in:
    - create token in the server using jwt.sign() with a secret key
    - return token to the client
    - store token in session storage; remove when user logs out or closes the browser session
    - set state for logged-in in order to show privileged functionality to the user
  - when a logged-in user interacts with the news article:
    - retrieve token from session storage and send to server on the authorization header of the endpoint
    - in the server, verify the token signature using jwt.verify() with a secret key
    - send response to the client


## Roadmap
**Week 1**
  - Server:
    - Initial folder structure and Git repo
    - Installation of required packages
    - Database connection with knex
    - Knex migrations: create 3 DB tables (users, news, comments)
    - Knex seeding DB tables with sample data
    - External GET API for top headline news
    - External GET API for sources of top headline news
    - Middleware to manipulate external API data and save to database

  - Client:
    - Initial folder structure and Git repo
    - Installation of required packages
    - Sass variables, mixins, breakpoints, colors, and font-face
    - React router
    - Header component (responsive)
    - Footer component (responsive)

**Week 2**
  - Server:
    - Server-side auth
    - GET API for list of news articles updated in the last 24 hours
    - GET API for list of news articles updated within provided date range
    - POST API for user signup
    - POST API for user login
    - GET API for user profile
    - GET API for news detail
    - PUT API for news article views
    - PUT API for news article likes

  - Client:
    - Client-side auth
    - User signup component (responsive)
    - User login component (responsive)
    - User profile component (responsive)
    - List of news articles component (responsive)
    - News article comments section component (responsive)
    - News article detail component (responsive)
    - News article add views component (responsive)
    - News article add likes component (responsive)


**Week 3**
  - Server:
    - POST API for news article comment add
    - PUT API for news article comment delete

  - Client:
    - News article add new comment component (responsive)
    - News article delete comment component (responsive)
    - News article archive component (responsive)
    - News articles filter by category functionality
    - News articles search by title and description functionality
    - News articles animation

  - Testing
    - Bug fixes


## Nice-to-haves
- Profile update functionality
  - password reset
  - user information update

- Comments delete confirmation modal

- Comments edit endpoint
  - Modify existing comments to a news article
  - use edit form fields modal

- Comments like endpoint
  - display comment likes count on page
  - increment count when endpoint is used
