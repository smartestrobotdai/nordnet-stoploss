console.log('Fetching ')
fetch("https://www.nordnet.se/api/2/batch", 
{"headers":{"accept":"application/json","accept-language":"en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,sv;q=0.6","content-type":"application/json"}})
  .then(resp => {
    console.log(resp)
  })
