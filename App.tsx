import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native";
import { WebView } from 'react-native-webview';
import { instagramSDK } from 'instagram-sdk';



export default function App() {
  const instagramClient = instagramSDK;
  (async () => {
    const stateToInitialize = await (async () => {
      const rawStateString = await AsyncStorage.getItem('state');
      if (rawStateString) {
        console.log('found local state');
        return JSON.parse(rawStateString) as Object;
      }
      await instagramSDK.loginService.androidLogin({
        urlWithParams: 'http://192.168.219.80:8080/v2/instagram/android/login-request',
        method: 'POST',
        body: {
          username: 'test',
          password: 'test'
        }
      });
  
      const state = instagramClient.loginService.authenticatedStateComponent.android;
      console.log(state.authenticatedValue());
      await AsyncStorage.setItem('state', JSON.stringify(state.authenticatedValue()));
      return;
    })();

    if (stateToInitialize) {
      console.log('initializing using local state');
      instagramClient.loginService.authenticatedStateComponent.android.loadState(stateToInitialize)
    }
    console.log('state', instagramClient.loginService.authenticatedStateComponent.android.authenticatedValue())

    const feedData = await instagramClient.reelsFeedService.next({});
    console.log('feeeeed', feedData);


  })();
  // instagramClient.messagesService.startCapturing();
  // instagramClient.messagesService.subscribe().subscribe( data => {
  //   console.log('subscribed data', data);
  // });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView 
        source={{ uri: 'https://instagram.com/direct/inbox' }}
        onMessage={ instagramClient.messagesService.websocketMessageCaptureComponent.onMessageReceived.bind(instagramClient.messagesService.websocketMessageCaptureComponent) }
        injectedJavaScriptBeforeContentLoaded={ instagramClient.messagesService.websocketMessageCaptureComponent.getInjectableJavaScript() }
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
