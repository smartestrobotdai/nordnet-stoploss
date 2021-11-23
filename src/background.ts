chrome.runtime.onInstalled.addListener(() => {

  console.log('bbbb...');
  // create alarm after extension is installed / upgraded
  chrome.alarms.create('refresh', { periodInMinutes: 1 });

  chrome.alarms.onAlarm.addListener((alarm) => {
    console.log(alarm.name); // refresh
    chrome.tabs.query({ url: 'https://www.nordnet.se/*' }, tabs => {
      console.log(tabs)
      chrome.tabs.executeScript(
        tabs[0].id!,
        {file: 'inject.js'}
      )})
  })
  
  function helloWorld() {
    console.log("Hello, world!");
  }

  function startReqest() {
    fetch("https://www.nordnet.se/api/2/accounts/trades", {"credentials":"include","headers":{"accept":"application/json","accept-language":"en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,sv;q=0.6","client-id":"NEXT","ntag":"ed822d73-cd84-49f5-95c8-aedd2247711a","sec-fetch-mode":"cors","sec-fetch-site":"same-origin","x-nn-href":"https://www.nordnet.se/oversikt"},"referrer":"https://www.nordnet.se/","referrerPolicy":"origin","body":null,"method":"GET","mode":"cors"})
      .then(resp => {console.log(resp)})
  }

  chrome.storage.sync.set({ color: '#3aa757' });

  chrome.webNavigation.onCompleted.addListener(() => {

    chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
      if (id) {
        chrome.pageAction.show(id);
      }
    });
  }, { url: [{ urlMatches: 'www.nordnet.se' }] });
});
