"use strict";

// Get quotes from API
let apiQuotes = [];
const quoteContainer = document.getElementById("quote-container");
const quoteId = document.getElementById("quote");
const quoteleftId = document.getElementById("quote-left");
const authorId = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show loading
function loading() {
  loader.hidden = false; // hidden is default property for each element
  quoteContainer.hidden = true;
}
// Hide Loading
function hideloading() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Function show new quotes
function newQuote(apiQuotes) {
  //loading();
  let random = Math.trunc(Math.random() * apiQuotes.length + 1);
  const { text, author } = apiQuotes[random]; // destructing array and object
  if (!author) {
    authorId.textContent = "Unknow";
  } else {
    authorId.textContent = author;
  }

  console.log(text.length);
  if (text.length > 80) {
    // take length text of quote
    quoteId.classList.add("long-quote");
    quoteleftId.classList.add("fa-quote-long-quote");
    // add in classList
  } else {
    quoteId.classList.remove("long-quote");
    quoteleftId.classList.remove("fa-quote-long-quote");
  }
  quoteId.textContent = text;
  //hideloading();
}

// Async function enable asynchronous, promise-based behavior to be written in a cleaner style,
// avoiding the need to explicitly configure promise chains.

// Use this trick delay function to delay one function in async function by using SetTimeOut()
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let check = 0;
async function GetAPI() {
  loading();
  await delay(2000);
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // When calling the Fetch API and passing in the URL to the Random User API.
    // Then a response is received. However, the response you get is not JSON,
    // but an object with a series of methods that can be used depending on what you want to do
    // with the information. To convert the object returned into JSON, use the json() method.
    newQuote(apiQuotes);
  } catch (error) {
    console.log(error);
  }
  hideloading();
}
hideloading();
GetAPI();
// New Quote button
document.querySelector("#new-quote").addEventListener("click", GetAPI);
// Twitter button
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteId.textContent} - ${authorId.textContent}`;
  window.open(twitterUrl, "_blank"); // _blank poping new tab
}
document.querySelector("#twitter").addEventListener("click", tweetQuote);
