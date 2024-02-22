const apiUrls = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://jsonplaceholder.typicode.com/todos/3",
    "https://jsonplaceholder.typicode.com/todos/4",
    "https://jsonplaceholder.typicode.com/todos/5",
    "https://jsonplaceholder.typicode.com/todos/6",
    "https://jsonplaceholder.typicode.com/todos/7",
    "https://jsonplaceholder.typicode.com/todos/8",
    "https://jsonplaceholder.typicode.com/todos/9",
    "https://jsonplaceholder.typicode.com/todos/10",
  ];

  function fetchData(url){
    return new Promise((resolve, reject) =>{
        const startTime = Date.now();
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            const endTime = Date.now();
            const timeTaken = endTime - startTime;
            resolve({url, timeTaken});
        })
        .catch(error => {
            reject({url, error});
        });
    });
  }
// Function to compare performance using Promise.all

function promiseAllComparison(){
    const startTimeAll = Date.now();

    Promise.all(apiUrls.map(url => fetchData(url)))
    .then(results => {
        const endTimeAll = Date.now();
        const timeTakenll = endTimeAll - startTimeAll;

        //display results on the webpage
        document.getElementById('output-all').textContent = `${timeTakenll} ms`;
    })
    .catch(error => console.error(`Promise.all() Error`, error));
}

// Function to compare performance using Promise.any

function promiseAnyComparison(){
    const startTimeAny = Date.now();

    Promise.any(apiUrls.map(url => fetchData(url)))
    .then(results => {
        const endTimeAny = Date.now();
        const timeTakenAny = endTimeAny - startTimeAny;

        //display results on the webpage
        document.getElementById('output-all').textContent = `${timeTakenAny} ms`;
    })
    .catch(error => console.error(`Promise.any() Error`, error));
}


promiseAllComparison();
promiseAnyComparison();