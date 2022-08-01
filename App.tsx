import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native";
import { WebView } from 'react-native-webview';

function captureRequests() {
  const script = `
  XMLHttpRequest.prototype.origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
      // these will be the key to retrieve the payload
      this.recordedMethod = method;
      this.recordedUrl = url;
      this.origOpen(method, url, async, user, password);

      this.onreadystatechange1 = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify(
              {
                result: true,
                method: this.recordedMethod, 
                url: this.recordedUrl, 
                body: this.recordedBody,
                response: this.response,
                responseHeaders: this.getAllResponseHeaders(),
                requestHeaders: this.recordedRequestHeaders,
              }
            )
          );
        }
      }
  };

  XMLHttpRequest.prototype.origSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
  XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
    if(!this.recordedRequestHeaders) {
      this.recordedRequestHeaders = {}
    }
    this.recordedRequestHeaders[header]=value;
    this.origSetRequestHeader(header,value);
  }


  XMLHttpRequest.prototype.origSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function(body) {
    if(body) {
      this.recordedBody = body;
    };
    window.ReactNativeWebView.postMessage(
      JSON.stringify(
        {
          method: this.recordedMethod, 
          url: this.recordedUrl, 
          body: this.recordedBody,
          requestHeaders: this.recordedRequestHeaders,
        }
      )
    );
    if(this.recordedUrl.includes('login')) {
      return;
    }
    this.origSend(body);
  };

  // WebSocket.prototype.originalAddEventListener = WebSocket.prototype.addEventListener;
  // WebSocket.prototype.addEventListener = function (event, handler) {
  //   console.log('asked', event, handler);
  //   this.originalAddEventListener(event, handler);

  //   if(event === 'message') {
  //     this.originalAddEventListener(event, (data) => {
  //       window.ReactNativeWebView.postMessage(
  //         JSON.stringify(
  //           {
  //             type: 'ws',
  //             data: data
  //           }
  //         );
  //       );
  //     });
  //   };
  // };

  const handler = {
  };

  handler.construct = function(target, args) {
    const instance = new target(...args);
    instance.addEventListener('message', function(data) {
      const res = String.fromCharCode.apply(null, new Uint8Array(data.data))
      window.ReactNativeWebView.postMessage(
        JSON.stringify(
          {
            type: 'ws',
            data: data,
            res,
          }
        )
      );
    });
    return instance;
  };
  WebSocket = new Proxy(WebSocket, handler);
  
  true;
  `;
  return script
}

async function makeApiCall(params: {
  requestHeaders: any,
  body: string,
  url: string,
  method: string,
}) {
  const result = await fetch(
    params.url,
    {
      method: params.method,
      headers: {
        ...params.requestHeaders,
        'Host': 'i.instagram.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Origin': 'https://i.instagram.com',
        'Alt-Used': 'i.instagram.com',
        'Connection': 'keep-alive',
        // 'Referer': 'https://www.instagram.com/accounts/login/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
      },
      body: params.body,
    }
  );
  console.log(result.ok, result.headers, result.status);
  
  result.json().then(d => {
    // const [{ media_or_ad: item1 }, { media_or_ad: item2 }] = d.feed_items;
    // delete item1.image_versions2;
    // delete item2.image_versions2;

    // delete item1.carousel_media;
    // delete item2.carousel_media;

    // console.log('xxx', item1);
    // console.log('yyy', item2);

    console.log('aaa', d.feed_items.map((i: any) => i.media_or_ad.taken_at))
  })
}

async function makeApiCallXML(params: {
  requestHeaders: any,
  body: string,
  url: string,
  method: string,
}) {
  const headers = {
    ...params.requestHeaders,
    'Host': 'i.instagram.com',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Origin': 'https://i.instagram.com',
    'Alt-Used': 'i.instagram.com',
    'Connection': 'keep-alive',
    // 'Referer': 'https://www.instagram.com/accounts/login/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
  };
  const xhr = new XMLHttpRequest();
  xhr.open(params.method, params.url, true);
  for (const key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }
  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log('xxx', this.responseText, this.responseType, this.response, this.responseXML, this.responseURL);
    }
  }
  xhr.send(params.body);
  
  
  // console.log(reader, reader?.read());
  // ..then(d => {
  //   console.log('aaa', d.)
  // })
}

export default function App() {
  async function login(params: {
    requestHeaders: any,
    body: string,
    url: string,
    method: string,
  }) {
    const result = await fetch(
      `https://instagram.com${params.url}`,
      {
        method: params.method,
        headers: {
          ...params.requestHeaders,
          'Host': 'www.instagram.com',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Origin': 'https://www.instagram.com',
          'Alt-Used': 'www.instagram.com',
          'Connection': 'keep-alive',
          'Referer': 'https://www.instagram.com/accounts/login/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
        },
        body: params.body,
      }
    );
    console.log(result.ok, result.headers, result.status);
    result.json().then(d => {
      console.log('aaa', d)
    })
  }

  // fetch(
  //   'https://i.instagram.com/api/v1/feed/timeline',
  //   {
  //     method: 'GET',
  //     headers: {
  //       'Host': 'www.instagram.com',
  //       'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0',
  //       'Accept-Language': 'en-US,en;q=0.5',
  //       'Accept-Encoding': 'gzip, deflate, br',
  //       'Origin': 'https://www.instagram.com',
  //       'Alt-Used': 'www.instagram.com',
  //       'Connection': 'keep-alive',
  //       // 'Referer': 'https://www.instagram.com/accounts/login/',
  //       'Sec-Fetch-Dest': 'empty',
  //       'Sec-Fetch-Mode': 'cors',
  //       'Sec-Fetch-Site': 'same-origin',
  //     }
  //   }
  // ).then(result => {
  //   console.log(result.ok, result.headers, result.status);
  //   result.json().then(d => {
  //     console.log('bbb', d)
  //   }).catch(e => {
  //     console.log(e)
  //   })
  // });
  
  


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView 
        source={{ uri: 'https://instagram.com/direct/inbox' }}
        onMessage={(event) => {
          const parsedData = JSON.parse(event.nativeEvent.data);
          if (parsedData.type === 'ws') {
            console.log(parsedData, Date.now());
            return;
          }
          // if (parsedData.url.includes('login')) {
          //   console.log(parsedData);
          //   login(parsedData);
          // }
          // if (parsedData.url.includes('feed/timeline')) {
          //   console.log(parsedData);
          //   if (!parsedData.result) {
          //     // makeApiCall(parsedData);
          //   }
          // }
        }}
        injectedJavaScriptBeforeContentLoaded={captureRequests()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
