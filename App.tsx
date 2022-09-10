import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native";
import { WebView } from 'react-native-webview';
import { instagramSDK } from 'instagram-sdk';



export default function App() {
  const instagramClient = instagramSDK;
  (async () => {
    await instagramSDK.loginService.androidLogin({
      urlWithParams: 'http://192.168.50.81:8080/v2/instagram/android/login-request',
      method: 'POST',
      body: {
        username: 'test',
        password: 'test'
      }
    });

    const state = instagramClient.loginService.authenticatedStateComponent.android
    console.log(state.androidState);
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
