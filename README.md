# What is this?
It is a Serverless Function in Vercel that interacts with the [twitter135](https://rapidapi.com/Glavier/api/twitter135/) API to obtain all the necessary information from a tweet for [Frame it!](https://github.com/mybess00/frame-it).

It is obtained from the tweet:
- Username.
- User id.
- Profile picture.
- Body of the tweet.
- Date.
- Images.
- Stats information: favorites, comments and retweets.

## Environment variables.

When you used you will have to create two environment variables:


``ALLOW_DOMAIN`` : it contains the domain that can interact with the API.  
``RAPID_API_KEY`` : this the API KEY that provides you RapidAPI to interact with [twitter135](https://rapidapi.com/Glavier/api/twitter135/) API.  

## Making a request

To fetch this serverless function follow this example:

```
const myVercelTwitterAPI = 'https://my-api-address/api/';
const tweetID = '1629193609080709122';

const options = {
  method: 'GET'
};

const tweetInformation = fetch(`${myVercelTwitterAPI}${tweetID}`, options)
  .then(response => response.json())
  .catch(err => console.error(err));
```