# canvas-vs-table-orderbook

**[DEMO](https://canvas-performance.netlify.app/)**

## Motivation

Sample implementation of an exchange orderbook developed with the intention of comparing components performance. On one side there is a standard implementation using ~~tables~~ _div_ elements, on the other an implementation using canvases. The main goal is to compare performance of these orderbook implementations in regard to frequent content updates and necessary re-renders.

## Getting started

Clone repo

```
git clone https://github.com/M0kY/canvas-vs-table-orderbook.git
```

Install dependecies

```
npm install
```

Run in development mode

```
npm start
```

or create a production build with `profiler` enabled

```
npm run build -- --profile
```
