# About

This project is made with React combined with Astro to generate the static files. The result can be found [in this page:](https://flowbox-test-pau-sabater.vercel.app/), deployed through Vercel.
Redux is used to manage the state of the app and scss modules are used for styling.
Custom api endpoints have been created to mock the images data response, which is initially extracted from [Unsplash.](https://unsplash.com/developers).

## Run de project

The following commands are used to run the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |


## Testing
Jest has been used for tests, which can be run with the following command:

`npm run test`

## Api calls
Since Unsplash has a limit of 50 requests per hour, we have added 5 custom api endpoints with saved responses from Unsplash:
https://flowbox-test-pau-sabater.vercel.app/api/nature
https://flowbox-test-pau-sabater.vercel.app/api/architecture
https://flowbox-test-pau-sabater.vercel.app/api/animals
https://flowbox-test-pau-sabater.vercel.app/api/fashion
https://flowbox-test-pau-sabater.vercel.app/api/food

The real Unsplash request is made with the search component.