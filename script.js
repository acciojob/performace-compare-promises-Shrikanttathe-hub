// main.js

const apiUrls = [
  'https://api.example.com/1',
  'https://api.example.com/2',
  // ... Add more API URLs as needed
];

function fetchData(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const endTime = Date.now();
        const timeTaken = endTime - startTime;
        resolve({ url, timeTaken });
      })
      .catch(error => {
        reject({ url, error });
      });
  });
}

// Function to compare performance using Promise.all
function promiseAllComparison() {
  const startTimeAll = Date.now();

  Promise.all(apiUrls.map(url => fetchData(url)))
    .then(results => {
      const endTimeAll = Date.now();
      const timeTakenAll = endTimeAll - startTimeAll;

      // Display results on the webpage
      document.getElementById('output-all').textContent = `${timeTakenAll} ms`;
    })
    .catch(error => console.error('Promise.all() Error:', error));
}

// Function to compare performance using Promise.any
function promiseAnyComparison() {
  const startTimeAny = Date.now();

  Promise.any(apiUrls.map(url => fetchData(url).catch(error => error)))
    .then(result => {
      const endTimeAny = Date.now();
      const timeTakenAny = endTimeAny - startTimeAny;

      // Display results on the webpage
      document.getElementById('output-any').textContent = `${timeTakenAny} ms`;
    })
    .catch(error => console.error('Promise.any() Error:', error));
}

// Perform the comparisons
promiseAllComparison();
promiseAnyComparison();
