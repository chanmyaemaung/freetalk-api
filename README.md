# Free Talk Node.js Advanced RESTful API

## Introduction

This is a RESTful API for the Free Talk Node.js Advanced course. It is a simple API that allows you to create, read, update and delete users and tokens.

## Installation

1. Clone the repository
2. Run `npm install`
3. Run `npm run start`
4. Your API is now running on port 8080

#### Create a post

To create a user, send a POST request to `/api/post/new` with the following payload:

```json
{
	"title": "Your title",
	"content": "Your content"
}
```

#### Get a post

To get a post, send a GET request to `/api/post/show/:postId`

#### Update a post

To update a post, send a PUT request to `/api/post/update/:postId` with the following payload:

```json
{
	"title": "Your new title",
	"content": "Your new content"
}
```

#### Delete a post

To delete a post, send a DELETE request to `/api/post/delete/:postId`

#### Create a comment

To create a comment, send a POST request to `/api/comment/new` with the following payload:

```json
{
	"postId": "Your post id",
	"content": "Your content"
}
```

#### Get a comment

To get a comment, send a GET request to `/api/comment/show/:commentId`

#### Delete a comment

To delete a comment, send a DELETE request to `/api/comment/delete/:commentId`

#### Version 1.0.0

#### Tags

-   v0.1.0 - Initial release
-   v0.2.0 - Implemented the user registration and custom error handling
-   v0.2.1 - Update all the models schema with type validation.
