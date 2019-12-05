# Teamwork
an internal social network for employees of an organization.

[![Build Status](https://travis-ci.org/meetKazuki/Teamwork.svg?branch=develop)](https://travis-ci.org/meetKazuki/Teamwork)
[![Coverage Status](https://coveralls.io/repos/github/meetKazuki/Teamwork/badge.svg?branch=develop)](https://coveralls.io/github/meetKazuki/Teamwork?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/b42e73c36c439a2825f9/maintainability)](https://codeclimate.com/github/meetKazuki/Teamwork/maintainability)
![GitHub](https://img.shields.io/github/license/meetKazuki/Teamwork)

Teamwork is an ​internal social network for employees of an organization. The goal of this application is to facilitate more interaction between colleagues and promote team bonding.


## Features

1. Admin can create an employee user account.
2. Admin/Employees can sign in.
3. Employees can post gifs.
4. Employees can write and post articles.
5. Employees can edit their articles.
6. Employees can delete their articles.
7. Employees can delete their gifs post.
8. Employees can comment on other colleagues' article post.
9. Employees can comment on other colleagues' gif post.
10. Employees can view all articles and gifs, showing the most recently posted
articles or gifs first.
11. Employees can view a specific article.
12. Employees can view a specific gif post. 


## Project Pipeline

* [Hosted API _on Heroku_](https://teamed.herokuapp.com/)
* [API Docs](https://teamed.herokuapp.com/docs)


## Technologies Used

* NodeJS/ExpressJS
* PostgreSQL
* Express-Validator (_for server-side validation_)
* Mocha & Supertest (_for automated testing_)
* Swagger (_for API documentation using openapi 3.0.0 spec_)


## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- [NodeJS](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Installing/Running locally

- Clone or fork repo🤷‍♂

  ```bash
    - git clone https://github.com/meetKazuki/Teamwork.git
    - cd Teamwork
    - npm install
  ```

- Create a PostgreSQL database by running the command below in `psql`

  ```bash
    createdb -h localhost -p 5432 -U postgres <database-for-dev>
  ```

- Create/configure `.env` environment with your credentials. A sample `.env.example` file has been provided to get you started. Make a duplicate of `.env.example` and rename to `.env`, then configure your credentials (ensure to provide the correct details).

- Run `npm run dev` to start the server and watch for changes

### Testing

Test specs are implemented using [_mocha_](https://mochajs.org) & [_chai_](https://chiajs.com).

- To test or consume the API locally, you can make use of [_Postman_](https://www.getpostman.com) to simulate a front-end client.

- You can also run an automated test. Just ensure to follow the step below

  ```bash
   createdb -h localhost -p 5432 -U postgres <database-for-test>
  ```

- Fire up the tests by running `npm test`. `npm test` performs a single full test suite run, including code coverage reporting.


## HTTP Requests

All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `POST` Create a resource
- `GET` Get a resource or list of resources
- `PATCH` Update a resource
- `DELETE` Delete a resource

For `POST` and `PATCH` requests, the body of your request may include a JSON payload.

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `401` `Unauthorized` The supplied API credentials are invalid
- `403` `Forbidden` The credentials provided do not have permissions to access the requested resource
- `404` `Not Found` An attempt was made to access a resource that does not exist in the API
- `412` `Authorization Header not set` An attempt was made to access a protected route without providing a token
- `500` `Server Error` An error on the server occurred


## License

The Teamwork API is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Misc😏

If for some reason you find this repo useful, please give me a star. Also, if you have any issue, do well to call my attention to it🙏
