import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  color = '#ffffff';

  ngOnInit(): void {
    chrome.storage.sync.get('color', ({ color }) => {
      this.color = color;
    })
    chrome.webRequest.onBeforeSendHeaders.addListener(
      (requestDetails) => {
        console.log(requestDetails)
      }, {urls: ["<all_urls>"]}, ['requestHeaders']
    )
    console.log('onBeforeSendHeaders')
  }

  public updateColor(color: string) {
    chrome.storage.sync.set({ color});
  }

  public colorize() {
    console.log('colorize')
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.executeScript(
        tabs[0].id!,
        { code: `document.body.style.backgroundColor = '${ this.color }';` }
      );
      chrome.tabs.executeScript({
        code: `console.log('location:', window.location.href);`
      })


    })
      // V3 API, uncomment once supported
      // chrome.scripting.executeScript({
      //   target: {
      //     tabId: tabs[0].id!,
      //   },
      //   function: () => document.body.style.backgroundColor = this.color
      // })
  }
}
