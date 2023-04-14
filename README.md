# Documentation for Social Media Platform APIs

This is a documentation for the Social Media Platform APIs, which are built using NodeJS with the help of ExpressJS framework and MongoDB as the database. The APIs provide various features such as user authentication, following/unfollowing users, uploading and deleting posts, liking and commenting on posts, and getting user profiles and posts.

## Requirements

- Node.js version 14.17 or higher.
- The following Node.js packages:
  - `bcrypt` for secure password hashing in the project.
  - `body-parser` for parsing incoming request bodies in the project.
  - `cors` for enabling Cross-Origin Resource Sharing (CORS) support in the project.
  - `dotenv` for loading environment variables from a .env file in the project.
  - `express` for building HTTP servers and routing requests in the project.
  - `jsonwebtoken` for creating and verifying JSON web tokens (JWTs) in the project.
  - `mongoose` for interacting with MongoDB databases and performing object-document mapping (ODM) in the project.

## Usage

1. Clone or download the repository to your local machine.
2. Open a terminal or command prompt and navigate to the directory containing the script.
3. Install the required packages by running `npm install` in the terminal/command prompt.
4. Run the script by running `node index.js` in the terminal/command prompt.

## Endpoints
- ### Authentication
    `POST /api/authenticate`
    This endpoint authenticates the user and returns a JSON Web Token (JWT) that should be included in the headers of all subsequent requests.
    - Request
        Headers:
        ```bash 
        Content-Type: application/json 
        ```
        Body:
        ```bash
        {
            "email": "naresh3@gmail.com",
            "password": "123456"
        }
        ```
   - Response
        Headers:
        ```bash 
        Content-Type: application/json 
        ```
        Body:
        ```bash
        {
            "token": "JWT_TOKEN"
        }
        ```
        where `JWT_TOKEN` is the JWT that should be included in the headers of all subsequent requests.
- ### User
    `GET /api/user`
    This endpoint authenticate the request and return the respective user profile
    - Request
        Headers:
        ```bash 
        Authorization: Bearer JWT_TOKEN 
        ```
   - Response
        Headers:
        ```bash 
        Content-Type: application/json 
        ```
        Body:
        ```bash
        {
            "followers": "NUMBER_OF_FOLLOWERS",
            "followings": "NUMBER_OF_FOLLOWINGS"
        }
        ```
        where `NUMBER_OF_FOLLOWERS` is the number of followers of the authenticated user, and `NUMBER_OF_FOLLOWINGS` is the number of users the authenticated user is following.

- ### Follow/Unfollow
    `POST /api/follow/{id}`
    This endpoint allows the authenticated user to follow a user with the specified ID.
    - Request
        Headers:
        ```bash 
        Authorization: Bearer JWT_TOKEN 
        ```
   - Response
        Headers:
        ```bash 
        Content-Type: application/json 
        ```
        Body:
        ```bash
        {
            "message": "USER_FOLLOWED_SUCCESSFULLY"
        }
        ```
        where `USER_FOLLOWED_SUCCESSFULLY` is a message indicating that the authenticated user has successfully followed the user with the specified ID.
    
    `POST /api/unfollow/{id}`
    This endpoint allows the authenticated user to unfollow a user with the specified ID.
    - Request
        Headers:
        ```bash 
        Authorization: Bearer JWT_TOKEN 
        ```
   - Response
        Headers:
        ```bash 
        Content-Type: application/json 
        ```
        Body:
        ```bash
        {
            "message": "USER_UNFOLLOWED_SUCCESSFULLY"
        }
        ```
        where `USER_UNFOLLOWED_SUCCESSFULLY` is a message indicating that the authenticated user has successfully unfollowed the user with the specified ID.

- ### Posts
    `POST /api/posts`
    This endpoint allows an authenticated user to upload a new post.
    - Request
        Headers:
        ```bash 
        Authorization: Bearer JWT_TOKEN 
        ```
        Body:
        ```bash
        {
            "title": "Post Title",
            "description": "Post Description"
        }
        ```
   - Response
        Headers:
        ```bash 
        Content-Type: application/json 
        ```
        Body:
        ```bash
        {
            "id": "POST_ID",
            "title": "New Post 3",
            "description": "description 4",
            "createdAt": "14/4/2023"
        }
        ```
        where `POST_ID` is the ID of the post created.
    
    `DELETE /api/posts/{id}`
    This endpoint allows an authenticated user to delete their own post by passing in the {id} of the post to delete.
    - Request
        Headers:
        ```bash 
        Authorization: Bearer JWT_TOKEN 
        ```
   - Response
        Headers:
        ```bash 
        Content-Type: application/json 
        ```
        Body:
        ```bash
        {
            "post_id": "POST_ID"
        }
        ```
        where `POST_ID` is the ID of the deleted post.
        
    `POST /api/like/{id}`
    This endpoint allows an authenticated user to like a post by passing in the {id} of the post to like.
    - Request
        Headers:
        ```bash 
        Authorization: Bearer JWT_TOKEN 
        ```
   - Response
        Headers:
        ```bash 
        Content-Type: application/json 
        ```
        Body:
        ```bash
        {
            "message": "You already liked this post"
        }
        ```
        
    `POST /api/unlike/{id}`
    This endpoint allows an authenticated user to unlike a post by passing in the {id} of the post to unlike.
    - Request
        Headers:
        ```bash 
        Authorization: Bearer JWT_TOKEN 
        ```
   - Response
        Headers:
        ```bash 
        Content-Type: application/json 
        ```
        Body:
        ```bash
        {
            "message": "You disliked the post"
        }
        ```
    
    `POST /api/comment/{id}`
    This endpoint allows authenticated users to add a comment to a post with {id}.
    - Request
        Headers:
        ```bash 
        Authorization: Bearer JWT_TOKEN 
        ```
        Body:
        ```bash
        {
            "comment": "This is a comment"
        }
        ```
   - Response
        Headers:
        ```bash 
        Content-Type: application/json 
        ```
        Body:
        ```bash
        {
            "comment_id": "COMMENT_ID"
        }
        ```
        where `COMMENT_ID` is the ID of the created comment.
        
    `GET /api/posts/{id}`
    This endpoint allows an authenticated user to get a single post along with its number of likes and comments.
    - Request
        Headers:
        ```bash 
        Authorization: Bearer JWT_TOKEN 
        ```
   - Response
        Headers:
        ```bash 
        Content-Type: application/json 
        ```
        Body:
        ```bash
        {
            "id": "POST_ID",
            "title": "New Post 2",
            "totalLikes": "NUMBER_OF_LIKES",
            "totalComments": "NUMBER_OF_COMMENTS"
        }
        ```
        where `POST_ID` is the ID of the requested post, `NUMBER_OF_LIKES` is total number of likes on the post and `NUMBER_OF_COMMENTS` is the total number of comments on the post.
        
    `GET /api/all_posts`
    This endpoint retrieves all the posts created by the authenticated user and sorts them by post time.
    - Request
        Headers:
        ```bash 
        Authorization: Bearer JWT_TOKEN 
        ```
   - Response
        Headers:
        ```bash 
        Content-Type: application/json 
        ```
        Body:
        ```bash
        {
            "allPosts": [
                {
                  "id": "POST_ID",
                  "title": "New Post 2",
                  "description": "description 2",
                  "createdAt": "14/4/2023",
                  "comments": [
                    {
                      "_id": "COMMENT_ID",
                      "createdBy": "USER_ID",
                      "text": "New Comment",
                      "createdAt": "2023-04-14T10:52:25.231Z"
                    }
                  ],
                  "likes": "NUMBER_OF_LIKES"
                },
                ...
                ...
        }
        ```
        where `POST_ID` is the ID of the signle post, `NUMBER_OF_LIKES` is total number of likes on the that post and `COMMENT_ID` is the ID of the single comments on the post.


## Dummy data for getting token for authentication endpoint
- Email: naresh3@gmail.com
- Password: 123456

## Authors

- [@nareshkumaralaria](https://github.com/nareshkumaralaria) (Naresh Kumar)
