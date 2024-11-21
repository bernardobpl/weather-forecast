# Prague Forecast App

This is a simple React app that fetches weather data for Prague in the next day and displays it in a user-friendly way.
It was built using React, Typescript, React Query, and Vite.

## How to run locally
To run the app, simply run the following command:
```
npm run dev
```

## How to run with ngrok
- Create an account at [ngrok.com](https://ngrok.com).
- Navigate to Setup & Installation: https://dashboard.ngrok.com/get-started/setup
- Install ngrok
- Add your auth token with this command:
```
ngrok config add-authtoken <YOUR_AUTH_TOKEN>
``` 
- Run the app with this command:
```
npm run dev
```
- Expose the app with this command:
```
ngrok http http://localhost:5173
```
- Copy the ngrok URL and paste it in the browser to see the app.
