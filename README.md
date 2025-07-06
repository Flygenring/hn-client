# Latest top stories from Hacker News
This is a proof-of-concept (among other things) of a Hacker News client written in React.

Its purpose is to use the Hacker New API to read the latest stories, pick 20 of them, populate them with more detailed information, and then display them in a not too user-unfriendly way.

## Preview
The (first attempted) application can be found running at https://hn.flygenring.eu/

The (updated and muuuch more fancy) application can be found running at https://hn2.flygenring.eu/

## Running locally
Basically the app is run by cloning it from GitHub, installing dependencies, and running the `dev` script.  
This can be achieved using these simple commands from the directory you'd like it to live in:

```shell
git clone https://github.com/Flygenring/hn-client.git
cd hn-client
yarn install
yarn dev
```

## Architectural decisions and trade-offs
It would be more proper to use a data store for handling data retrieval, manipulation, and caching, so it's just part of the state, no custom loading or effects needed.

<strike>The template for cards could similarly be extracted into its own component for both clarity and compartmentalisation.</strike>
EDIT: I decided to do this after all, when I remade the interface anyway.

Routing would also be needed, had I chosen to implement the story details as a separate view to be navigated to.

But for all of these, the complexity and scope is just not big enough to warrant the effort and overhead.

## Room for improvement
The loading is somewhat slow, so obvious improvements would include handling each story separately instead of waiting for them all to load.  
This would also make sorting faster, but this could still be improved by sorting a proxy array containing only the story ID and score, and them referencing in the actual story.

As I let the App be responsible for setting the number of stories to fetch, it would be trivial to add a dropdown to let the user choose a different amount.

Similarly it would be nice, if slightly less straightforward, to let the user choose the attribute to sort the stories by.
