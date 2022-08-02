browser.browserAction.onClicked.addListener(function (tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content-script.js"],
  });
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["content-style.css"],
  });
});
