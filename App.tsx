import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native";
import { WebView } from 'react-native-webview';
// import { TimelineFeed } from './feed';

import { sample } from 'lodash';

interface TimelineFeedResponse {
  num_results: number;
  more_available: boolean;
  auto_load_more_enabled: boolean;
  feed_items: TimelineFeedResponseFeedItemsItem[];
  is_direct_v2_enabled: boolean;
  next_max_id: string;
  pagination_info: TimelineFeedResponsePagination_info;
  view_state_version: string;
  client_feed_changelist_applied: boolean;
  feed_pill_text: string;
  client_session_id: string;
  client_gap_enforcer_matrix: TimelineFeedResponseClientGapEnforcerMatrixItem[];
  status: string;
}
interface TimelineFeedResponseFeedItemsItem {
  media_or_ad: TimelineFeedResponseMedia_or_ad;
  stories_netego?: TimelineFeedResponseStories_netego;
}
interface TimelineFeedResponseMedia_or_ad {
  taken_at: number;
  pk: string;
  id: string;
  device_timestamp: string | number;
  media_type: number;
  code: string;
  client_cache_key: string;
  filter_type: number;
  comment_likes_enabled: boolean;
  comment_threading_enabled: boolean;
  has_more_comments: boolean;
  max_num_visible_preview_comments: number;
  preview_comments: TimelineFeedResponsePreviewCommentsItem[];
  can_view_more_preview_comments: boolean;
  comment_count: number;
  inline_composer_display_condition?: string;
  inline_composer_imp_trigger_time?: number;
  image_versions2?: TimelineFeedResponseImage_versions2;
  original_width?: number;
  original_height?: number;
  is_dash_eligible?: number;
  video_dash_manifest?: string;
  video_codec?: string;
  number_of_qualities?: number;
  video_versions?: TimelineFeedResponseVideoVersionsItem[];
  has_audio?: boolean;
  video_duration?: number;
  view_count?: number;
  user: TimelineFeedResponseUser;
  can_viewer_reshare?: boolean;
  caption_is_edited: boolean;
  like_count: number;
  has_liked: boolean;
  top_likers: string[];
  direct_reply_to_author_enabled: boolean;
  photo_of_you: boolean;
  caption: TimelineFeedResponseCaption;
  can_viewer_save: boolean;
  organic_tracking_token: string;
  preview?: string;
  inventory_source: string;
  is_seen: boolean;
  is_eof: boolean;
  injected?: TimelineFeedResponseInjected;
  collapse_comments?: boolean;
  ad_metadata?: TimelineFeedResponseAdMetadataItem[];
  link?: string;
  link_text?: string;
  ad_action?: string;
  link_hint_text?: string;
  iTunesItem?: null;
  ad_link_type?: number;
  ad_header_style?: number;
  dr_ad_type?: number;
  android_links?: TimelineFeedResponseAndroidLinksItem[];
  force_overlay?: boolean;
  hide_nux_text?: boolean;
  overlay_text?: string;
  overlay_title?: string;
  overlay_subtitle?: string;
  dominant_color?: string;
  follower_count?: number;
  post_count?: number;
  ad_id?: string;
  fb_page_url?: string;
  expiring_at?: number;
  location?: TimelineFeedResponseLocation;
  lat?: number;
  lng?: number;
  carousel_media_count?: number;
  carousel_media?: TimelineFeedResponseCarouselMediaItem[];
  can_see_insights_as_brand?: boolean;
  usertags?: TimelineFeedResponseUsertags;
  is_sidecar_child?: boolean;
  carousel_media_type?: number;
  facepile_top_likers?: TimelineFeedResponseFacepileTopLikersItem[];
  next_max_id?: string;
}
interface TimelineFeedResponseImage_versions2 {
  candidates: TimelineFeedResponseCandidatesItem[];
}
interface TimelineFeedResponseCandidatesItem {
  width: number;
  height: number;
  url: string;
}
interface TimelineFeedResponseVideoVersionsItem {
  type: number;
  width: number;
  height: number;
  url: string;
  id: string;
}
interface TimelineFeedResponseUser {
  pk: number;
  username: string;
  full_name: string;
  is_private: boolean;
  profile_pic_url: string;
  profile_pic_id?: string;
  friendship_status?: TimelineFeedResponseFriendship_status;
  is_verified: boolean;
  has_anonymous_profile_picture?: boolean;
  is_unpublished?: boolean;
  is_favorite?: boolean;
  latest_reel_media?: number;
}
interface TimelineFeedResponseFriendship_status {
  following: boolean;
  outgoing_request: boolean;
  is_muting_reel: boolean;
  is_bestie: boolean;
}
interface TimelineFeedResponseCaption {
  pk: string;
  user_id: number;
  text: string;
  type: number;
  created_at: number;
  created_at_utc: number;
  content_type: string;
  status: string;
  bit_flags: number;
  user: TimelineFeedResponseUser;
  did_report_as_spam: boolean;
  share_enabled: boolean;
  media_id: string;
  has_translation?: boolean;
}
interface TimelineFeedResponseInjected {
  label: string;
  show_icon: boolean;
  hide_label: string;
  invalidation: null;
  is_demo: boolean;
  view_tags: any[];
  is_holdout: boolean;
  tracking_token: string;
  show_ad_choices: boolean;
  ad_title: string;
  about_ad_params: string;
  direct_share: boolean;
  ad_id: string;
  display_viewability_eligible: boolean;
  lead_gen_form_id: string | number;
  is_leadgen_native_eligible: boolean;
  hide_reasons_v2: TimelineFeedResponseHideReasonsV2Item[];
  hide_flow_type: number;
  cookies: string[];
}
interface TimelineFeedResponseHideReasonsV2Item {
  text: string;
  reason: string | null;
}
interface TimelineFeedResponseAdMetadataItem {
  value: string;
  type: number;
}
interface TimelineFeedResponseAndroidLinksItem {
  linkType: number;
  webUri: string;
  androidClass: string;
  package: string;
  deeplinkUri: string;
  callToActionTitle: string;
  redirectUri: string;
  leadGenFormId: string | number;
  igUserId: null;
  appInstallObjectiveInvalidationBehavior: null;
}
interface TimelineFeedResponseLocation {
  pk: number | string;
  name: string;
  address: string;
  city: string;
  short_name: string;
  lng: number;
  lat: number;
  external_source: string;
  facebook_places_id: number | string;
}
interface TimelineFeedResponseCarouselMediaItem {
  id: string;
  media_type: number;
  image_versions2: TimelineFeedResponseImage_versions2;
  original_width: number;
  original_height: number;
  pk: string;
  carousel_parent_id: string;
  usertags?: TimelineFeedResponseUsertags;
  headline?: TimelineFeedResponseHeadline;
  video_subtitles_uri?: null;
  dominant_color?: string;
  link?: string;
  link_text?: string;
  link_hint_text?: string;
  android_links?: TimelineFeedResponseAndroidLinksItem[];
  ad_metadata?: TimelineFeedResponseAdMetadataItem[];
  ad_action?: string;
  ad_link_type?: number;
  force_overlay?: boolean;
  hide_nux_text?: boolean;
  overlay_text?: string;
  overlay_title?: string;
  overlay_subtitle?: string;
}
interface TimelineFeedResponseUsertags {
  in: TimelineFeedResponseInItem[];
}
interface TimelineFeedResponseInItem {
  user: TimelineFeedResponseUser;
  position: number[] | (string | number)[];
  start_time_in_video_in_sec: null;
  duration_in_video_in_sec: null;
}
interface TimelineFeedResponseHeadline {
  content_type: string;
  user: TimelineFeedResponseUser;
  user_id: number;
  pk: string;
  text: string;
  type: number;
  created_at: number;
  created_at_utc: number;
  media_id: string;
  bit_flags: number;
  status: string;
}
interface TimelineFeedResponsePreviewCommentsItem {
  pk: string;
  user_id: number;
  text: string;
  type: number;
  created_at: number;
  created_at_utc: number;
  content_type: string;
  status: string;
  bit_flags: number;
  user: TimelineFeedResponseUser;
  did_report_as_spam: boolean;
  share_enabled: boolean;
  media_id: string;
  has_liked_comment: boolean;
  comment_like_count: number;
  has_translation?: boolean;
  parent_comment_id?: string;
}
interface TimelineFeedResponseFacepileTopLikersItem {
  pk: number;
  username: string;
  full_name: string;
  is_private: boolean;
  profile_pic_url: string;
  profile_pic_id: string;
  is_verified: boolean;
}
interface TimelineFeedResponseStories_netego {
  tracking_token: string;
  hide_unit_if_seen: string;
  id: number;
}
interface TimelineFeedResponsePagination_info {
  source: null;
  group_id: null;
}
interface TimelineFeedResponseClientGapEnforcerMatrixItem {
  list: number[];
}


enum TimelineFeedReason {
  pagination = 'pagination',
  pull_to_refresh = 'pull_to_refresh',
  warm_start_fetch = 'warm_start_fetch',
  cold_start_fetch = 'cold_start_fetch',
}

enum TimelineFeedPaginationSource {
  favorites = 'favorites',
  following = 'following',
}

 interface TimelineFeedInput {
  nextMaxId?: string;
  reason?: TimelineFeedReason;
  paginationSource?: TimelineFeedPaginationSource | string;
  requestId?: string;
}

 class TimelineFeed {
  constructor(public input: TimelineFeedInput) {}

  // https://github.com/nestjs/swagger/issues/815
  static randomReason(): TimelineFeedReason {
    return sample([
      TimelineFeedReason.pull_to_refresh,
      TimelineFeedReason.warm_start_fetch,
      TimelineFeedReason.cold_start_fetch,
    ]) as TimelineFeedReason;
  }

  handle(body: TimelineFeedResponse) {
    this.input.nextMaxId = body.next_max_id;
    return body.more_available;
  }

  async makeApiCall(params: {
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
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
        },
        body: params.body,
      }
    );
    console.log(result.ok, result.headers, result.status);
    
    return result.json();
  }

  toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
  request(options: TimelineFeedsOptions = {}, deviceId: string, headers: any) {
    this.input.reason = TimelineFeed.randomReason();
    let form = {
      feed_view_info: '[]',
      is_pull_to_refresh: '0',
      pagination_source: this.input.paginationSource,
      device_id: deviceId,
    };
    if (this.input.nextMaxId) {
      form = Object.assign(form, {
        max_id: this.input.nextMaxId,
        reason: options.reason || 'pagination',
      });
    } else {
      form = Object.assign(form, {
        reason: options.reason || this.input.reason,
        is_pull_to_refresh: this.input.reason === 'pull_to_refresh' ? '1' : '0',
      });
    }
    console.log('hhhh', form);
    return this.makeApiCall({
      url: `https://i.instagram.com/api/v1/feed/timeline/`,
      method: 'POST',
      requestHeaders: headers,
      body: this.toUrlEncoded(form),
    });
  }

  items(raw: TimelineFeedResponse) {
    return raw.feed_items.filter(i => i.media_or_ad).map(i => i.media_or_ad);
  }
}

 interface TimelineFeedsOptions {
  reason?: TimelineFeedReason;
  recoveredFromCrash?: string;
  pushDisabled?: boolean;
  latestStoryPk?: string | number;
}


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
    // console.log('xxx', d)

    // const [{ media_or_ad: item1 }, { media_or_ad: item2 }] = d.feed_items;
    // delete item1.image_versions2;
    // delete item2.image_versions2;

    // delete item1.carousel_media;
    // delete item2.carousel_media;

    // console.log('xxx', item1);
    // console.log('yyy', item2);

    const { feed_items, ...rest } = d;
    console.log('cc', rest)
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
        source={{ uri: 'https://instagram.com' }}
        onMessage={(event) => {
          const parsedData = JSON.parse(event.nativeEvent.data);
          if (parsedData.url.includes('login')) {
            console.log(parsedData);
            login(parsedData);
          }
          if (parsedData.url.includes('feed/timeline')) {
            console.log(parsedData);
            const bodyObject = JSON.parse('{"' + decodeURI(parsedData.body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
            const feed = new TimelineFeed({ paginationSource: 'following' });
            feed.request({}, bodyObject.device_id, parsedData.requestHeaders)
            .then(d => {
              console.log('zzzzz', d);
            });
          }
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
