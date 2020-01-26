# is-my-train-running

[![Netlify Status](https://api.netlify.com/api/v1/badges/85cc0a12-9806-4bc6-a343-9008b3febbd9/deploy-status)](https://app.netlify.com/sites/check-my-train/deploys)

A node.js based static site generator which queries
[transportapi](https://www.transportapi.com/) for my morning train and builds a
static page to display the status of my train; on time, late or
cancelled.

Uses [netlify](https://www.netlify.com/) for building and hosting the site and
[zapier](https://zapier.com) to trigger builds at specified times.

Builds are currently set to trigger at 7:25, 7:30 & 7:35.

## Screenshots

### On time

<img src="./screenshots/on_time.png" width="200" />

### Cancelled

<img src="./screenshots/cancelled.png" width="200" />
