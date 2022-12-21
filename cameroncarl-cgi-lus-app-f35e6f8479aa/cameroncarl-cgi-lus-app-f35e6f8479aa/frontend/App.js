/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker,PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import * as Location from "expo-location";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native';
import config from './src/aws-exports';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { multiply } from "react-native-reanimated";
import styled from "styled-components";
import { AppLoading } from "expo-app-loading";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Exo_100Thin,
} from "@expo-google-fonts/dev";


Amplify.configure({
  ...config,
  Analytics: { 
    disabled: true
  }
});

//Stylesheet
const styles = StyleSheet.create ({
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 2,
    borderColor: '#0063bf',
    backgroundColor: '#0374DD'
  },
  icon: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  headertext: {
    flexDirection: 'row',
    fontSize: 25,
    fontWeight: '400',
    fontFamily: 'Rubik_500Medium',
    color: 'white',
  },
  reportButton: {
    flex: 0.75,
    justifyContent: 'center',
    backgroundColor: '#0374DD',
    padding: 10,
    borderRadius: 15,
  },
  notifHeader: {
    flex: 1,
    left: 5,
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontSize: 20,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  loginBox: {
    flex: 0.4,
    width: '75%',
    borderRadius: 20,
    borderColor: '#0063bf',
    backgroundColor: '#0374DD',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderWidth: 3,
    flexDirection: 'column',
    alignSelf: 'center',
    padding: 30,
  },
  notifSubmitBox: {
    backgroundColor: 'white',
    borderColor: '#0063bf',
    alignSelf: 'center',
    width: '85%',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  loginButton: {
    flex: 0.25,
    padding: 5,
    marginVertical: 5,
    backgroundColor: '#0374DD',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  newUserButton: {
    alignSelf: 'flex-start',
    textAlign: 'right',
    flex: 0.7,
    padding: 5,
    marginVertical: 5,
    width: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    width: 200,
    height: 100,
  },
  textbbl: {
    backgroundColor: "skyblue",
    padding: 15,
    margin: 10,
    borderRadius: 30,
  },
  bottomView:{
 
    width: '100%', 
    height: 50, 
    backgroundColor: '#0374DD',
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'relative',
    bottom: 0
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  notifListBox: {
    flex: 1,
    alignItems: 'flex-start',
    margin: 10,
    padding: 10,
    flexDirection: 'column',
    width: '95%',
  },
  notifButton: {
    flex: 0.08,
    paddingHorizontal: 50,
    backgroundColor: '#0374DD',
    padding: 20,
    borderRadius: 15,
    alignContent: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
  }
})
const DefaultText=styled.Text`
  fontSize: 20px;
  margin: 10px;
  fontFamily: "Rubik_400Regular";
`
const ReportText=styled.Text`
  fontSize: 15px;
  fontFamily: "Rubik_400Regular";
`
const NotifText=styled.Text`
  fontSize: 15px;
  margin: 10px;
  fontFamily: "Rubik_400Regular";
`

//Navigation and Pages 
const Drawer = createDrawerNavigator();
const Drawer_2 = createDrawerNavigator();


function PageHeader({route, navigation}) {
  return (<SafeAreaView style={styles.header}>
    <View>
    <Text style={styles.headertext}> {route.name}</Text>
    </View>

    
    <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center' }}>
    <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
    <Text><Icon name="menu" size={35} /></Text>
    </TouchableWithoutFeedback>
    </View>
    
    </SafeAreaView>
  );
}

function HomeScreen() {
  const [coordinates, setCoordinates] = useState("");
  const [count, setCount] = useState(0);
  const [mapRegion, setmapRegion] = useState({
    latitude: 30.116667,
    longitude: -92.033333,
    latitudeDelta: 1.0922,
    longitudeDelta: 0.0421,
  });
  const [abbCoords, setAbbCoords] = useState({
    latitude: 29.8747,
    longitude: -92.1343,
    latitudeDelta: 1.0922,
    longitudeDelta: 0.0421,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [myMarker, setMyMarker] = useState([
    {latitude: 30.18822394667579, longitude: -92.05585220321362},
    {latitude: 30.184672726572074, longitude: -92.05268801904562},
    {latitude: 30.191840719558517, longitude: -92.04711842215058},
    {latitude: 30.182136062396992, longitude: -92.06090469083675},
    {latitude: 30.191434165753922, longitude: -92.04792637717013},
    {latitude: 30.188510685569646, longitude: -92.05906742261017},
    {latitude: 30.196781640471222, longitude: -92.0565922134105},
    {latitude: 30.234125848435532, longitude: -92.02331628408764},
    {latitude: 30.18630498028377, longitude: -92.05462735772923},
    {latitude: 30.230898812739213, longitude: -92.02169235306029},
    {latitude: 30.18965763279695, longitude: -92.05822534133964},
    {latitude: 30.186988754239465, longitude: -92.06039433793497},
    {latitude: 30.18846657198225, longitude: -92.05049350360278},
    {latitude: 30.2891653, longitude: -92.0420834},
    {latitude: 30.1988238, longitude: -92.0906094},
    {latitude: 30.1931254, longitude: -92.0496049},
    {latitude: 30.2321407, longitude: -92.0178622},
    {latitude: 30.20825, longitude: -92.07058},
    {latitude: 30.18293, longitude: -92.0594489},
    {latitude: 30.2244696, longitude: -92.0254572},
    {latitude: 30.2181938, longitude: -91.9915424},
    {latitude: 30.24405, longitude: -92.02355},
    {latitude: 30.20396, longitude: -92.10808},
    {latitude: 30.228486, longitude: -92.0507215},
    {latitude: 30.1522275, longitude: -92.0557968},
    {latitude: 30.1711678, longitude: -92.0306207},
    {latitude: 30.19837, longitude: -92.04422},
    {latitude: 30.2002221, longitude: -92.0759505},
    {latitude: 30.0987649, longitude: -91.9847607}]);
  //const [points, setPoints] = useState([{latitude: 30, longitude: -92, weight: 1},{latitude: 31, longitude: -91, weight: 1}]);
  let points = [{latitude: 30.1234, longitude: -92.1234, weight: 1}];


  useEffect(() => {
    handle_list_database();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setCoordinates(String(location.coords.latitude) + "," + String(location.coords.longitude))
    })();
  }, []);

  const handle_update_database = () => {
    
    fetch("", {
      method: "POST",
      body: coordinates,
    })
      .then((response) => response.text())
      .catch(err => {
        console.log(err)
      });
      setTimeout(() => {
        handle_list_database();
    }, 3000);
      
  };


  /*
  const handle_query_database = () => {
    
    fetch("<API_URL>>", {
      method: "POST",
      body: coordinates,
    })
      .then((response) => response.text())
      .catch(err => {
        console.log(err)
      });
  };
  */
  async function handle_list_database() {

    try {

      const response = await fetch(), {
        method: "GET",
      })
      const data = await response.json()
      console.log(data)
      //console.log(parseFloat(data[0].latitude))
/*       data[0].latitude = parseFloat(data[0].latitude)
      data[0].longitude = parseFloat(data[0].longitude)
      console.log(data.length)
      console.log(typeof(data[0].latitude))
      console.log(typeof(data[0].longitude)) */
      for (let i=0; i < data.length; i++){
        data[i].latitude = parseFloat(data[i].latitude)
        data[i].longitude = parseFloat(data[i].longitude)
      }
      console.log(data)
      setMyMarker(data)

    } catch (error) {
      console.log(error)
    }
    
  };
  
  
  let text = "Waiting..";
  let myLatitude = "Waiting..";
  let myLogitude = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    myLatitude = JSON.stringify(location.coords.latitude);
    myLogitude = JSON.stringify(location.coords.longitude);
  }
  //code from test above
  /* let points = [{latitude: 30.1234, longitude: -92.1234, weight: 1},
    {latitude: 30.124, longitude: -92.124, weight: 1},
    {latitude: 30.2, longitude: -92.2, weight: 1},
    {latitude: 30.11114, longitude: -92.1984, weight: 1},
    {latitude: 30.125, longitude: -92.125, weight: 1},
    {latitude: 30.1539807, longitude: -91.98712, weight: 1},
    {latitude: 25.098132, longitude: -89.1987234, weight: 1},    */
;

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
      <MapView
      provider = {PROVIDER_GOOGLE}
      style={{width: '95%', height: '80%'}}
      region={{
        latitude: 30.197688,
        longitude: -92.03491,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      >
      <MapView.Heatmap points={myMarker}
        opacity={0.6}
        radius={30}
        maxIntensity={100}
        gradientSmoothing={10}
        heatmapMode={"POINTS_DENSITY"}/>
      </MapView>
      <Text>{"\n"}</Text>
      <Pressable onPress={handle_update_database} style={styles.reportButton}><ReportText style={styles.buttonText}>Report Outage At Your Location</ReportText></Pressable>
      

    </View>
  );
}
//global notification array
const arr = [
  "Potential outages until 6PM",
  "Downed line on Johnston Street",
  "Maintenance scheduled for 2PM"
];


function NotifScreen() {
  const [text, setText] = useState('');
  const [forceRender, setForceRender] = useState(false);

  function update_notif(){
    if (forceRender == false){
      setForceRender(true)
    }
    else{
      setForceRender(false)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 10, flexDirection: 'column-reverse', }}>
      <TouchableOpacity style={styles.notifButton} onPress={update_notif}><ReportText style={styles.buttonText}>Update List</ReportText></TouchableOpacity>
      <View style={styles.notifListBox}>
        {arr.map((person, index) => {
          return (
            <View>
              <NotifText key={index}>
              • {person}
              </NotifText>
            </View>
          );
        })}
      </View>
    </View>
  )
}

function AccInfo({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'flex-start', padding: 20, justifyContent: 'space-around' }}>
      <DefaultText>E-mail: { global.userEmail }</DefaultText>
      <DefaultText>Verified: { global.verified.toString() }</DefaultText>
      <DefaultText>Address: { global.userAddress }</DefaultText>
      <DefaultText>Phone Number: { global.userPhoneNum }</DefaultText>
      <DefaultText>Username: { global.username }</DefaultText>
      <DefaultText>Placeholder for more functions</DefaultText>
      <DefaultText>For example, forgot password, change account details, etc</DefaultText>
    </View>
  );
}

function AdminScreen() {
  const [text, setText] = useState('');
  const [text2, setText2] = useState(false);

  //appends input to notificaiton array 

  function update_notif(){
    arr.push(text)
    if (text2 == false){
      setText2(true)
    }
    else{
      setText2(false)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 10, flexDirection: 'column-reverse', }}>
      <TouchableOpacity style={styles.notifButton} onPress={update_notif}><ReportText style={styles.buttonText}>Submit/Refresh</ReportText></TouchableOpacity>
      <TextInput
        style={styles.notifSubmitBox}
        placeholder="Type new Notification"
        onChangeText={newText => setText( newText)}
        defaultValue={text}
      />      
      <View style={styles.notifListBox}>
        {arr.map((person) => {
          return (
            <View>
              <NotifText>
              {person}
              </NotifText>
            </View>
          );
        })}
      </View>
      
      
    </View>

  );

}

function LogoutPage() {
  return (
    <View>

    </View>
  )
}

// Orginal code that Cameron wrote
function Test({navigation}) {
  const [coordinates, setCoordinates] = useState("")
  const [count, setCount] = useState(0);
  const [mapRegion, setmapRegion] = useState({
    latitude: 30.116667,
    longitude: -92.033333,
    latitudeDelta: 1.0922,
    longitudeDelta: 0.0421,
  });
  const [abbCoords, setAbbCoords] = useState({
    latitude: 29.8747,
    longitude: -92.1343,
    latitudeDelta: 1.0922,
    longitudeDelta: 0.0421,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [myMarker, setMyMarker] = useState([]);

  let points = [{latitude: 30.1234, longitude: -92.1234, weight: 1},
    {latitude: 30.124, longitude: -92.124, weight: 1},
    {latitude: 30.2, longitude: -92.2, weight: 1},
    {latitude: 30.11114, longitude: -92.1984, weight: 1},
    {latitude: 30.125, longitude: -92.125, weight: 1},
    {latitude: 30.1539807, longitude: -91.98712, weight: 1},
    {latitude: 25.098132, longitude: -89.1987234, weight: 1},   
];


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setCoordinates(String(location.coords.latitude) + "," + String(location.coords.longitude))
    })();
  }, []);

  const handle_update_database = () => {
    
    fetch(), {
      method: "POST",
      body: coordinates,
    })
      .then((response) => response.text())
      .catch(err => {
        console.log(err)
      });
  };


  /*
  const handle_query_database = () => {
    
    fetch("<API_URL>>", {
      method: "POST",
      body: coordinates,
    })
      .then((response) => response.text())
      .catch(err => {
        console.log(err)
      });
  };
  */
  async function handle_list_database() {

    try {

      const response = await fetch(), {
        method: "GET",
      })
      const data = await response.json()

      //console.log(response)
      setMyMarker(data)
      //console.log(parseFloat(data[0].latitude))
      

    } catch (error) {
      console.log(error)
    }
    
  };
  

  let text = "Waiting..";
  let myLatitude = "Waiting..";
  let myLogitude = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    myLatitude = JSON.stringify(location.coords.latitude);
    myLogitude = JSON.stringify(location.coords.longitude);
  }
  return (
    <View style={styles.container}>
    
    <View style={styles.container}>
      <TouchableOpacity style={styles.textbbl} >
        <Text>Current coordinates: {coordinates}</Text>
        <Text>Database coordinates: {coordinates}</Text>
        
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={handle_update_database}>
        <Text>Update Database</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={handle_list_database}>
        <Text>List Database</Text>
      </TouchableOpacity>
      <Text>{console.log(typeof(myMarker))}</Text>
      <Text>{console.log(myMarker)}</Text>
      
    </View>
  </View>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        drawerPosition: 'right',
        drawerActiveTintColor: '#0374DD',
      }}
      >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ header: PageHeader, drawerIcon: ({}) => (<Icon name="home" size={20}/>), }} />
      <Drawer.Screen name="Notifications" component={NotifScreen} options={{ header: PageHeader, drawerIcon: ({}) => (<Icon name="notifications" size={20}/>), }}/>
      <Drawer.Screen name="Account Info" component={AccInfo} options={{ header: PageHeader, drawerIcon: ({}) => (<Icon name="person" size={20}/>), }}/>
      {/* <Drawer.Screen name="Admin Tools" component={AdminScreen} options={{ header: PageHeader, drawerIcon: ({}) => (<Icon name="admin-panel-settings" size={20}/>), }}/> */}
      <Drawer.Screen name="Log Out" component={SignOut} options={{ showHeader: false, drawerIcon: ({}) => (<Icon name="logout" size={20}/>), }}/>
      {/* <Drawer.Screen name="Test" component={Test} options={{ header: PageHeader }} /> */}
    </Drawer.Navigator>
  );
}

function MyDrawer_2() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        drawerPosition: 'right',
        drawerActiveTintColor: '#0374DD',
      }}
      >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ header: PageHeader, drawerIcon: ({}) => (<Icon name="home" size={20}/>), }} />
      <Drawer.Screen name="Notifications" component={NotifScreen} options={{ header: PageHeader, drawerIcon: ({}) => (<Icon name="notifications" size={20}/>), }}/>
      <Drawer.Screen name="Account Info" component={AccInfo} options={{ header: PageHeader, drawerIcon: ({}) => (<Icon name="person" size={20}/>), }}/>
      <Drawer.Screen name="Admin Page" component={AdminScreen} options={{ header: PageHeader, drawerIcon: ({}) => (<Icon name="admin-panel-settings" size={20}/>), }}/>
      <Drawer.Screen name="Log Out" component={SignOut} options={{ showHeader: false, drawerIcon: ({}) => (<Icon name="logout" size={20}/>), }}/>
      {/* <Drawer.Screen name="Test" component={Test} options={{ header: PageHeader }} /> */}
    </Drawer.Navigator>
  );
}


//sign Out function to sign out of the app. 
function SignOut(){
  Auth.signOut()
}


const App = () => {

  const API_URL = __DEV__ ? process.env.DEV_API_URL : process.env.PROD_API_URL;
  //const API_URL = "https://dj92dsgasc.execute-api.us-east-1.amazonaws.com";

  //sets admin to fasle by default 
  const [admin, setAdmin] = useState(false);
  //runs this function this once to determin if user is a Admin and changes admin to ture
  useEffect(
    function checkUser_2(){
    async function checkUser(){

     const user = await Auth.currentAuthenticatedUser({bypassCache: true});
     //console.log(user);
    global.userEmail = user.attributes.email; //Email 
    global.verified = user.attributes.email_verified; //Email Verfied 
    global.userAddress = user.attributes.address; // Address
    global.userPhoneNum = user.attributes.phone_number; // Phone number
    global.username = user.attributes.preferred_username; //user name
  
     
     const temp = user.signInUserSession.accessToken.payload["cognito:groups"];
     
     //console.log(temp);
     if (temp){
       //console.log("isAdmin");
       setAdmin(true);
     
     }
   }
   checkUser();
 },
   [],
 );

 let [fontsLoaded] = useFonts({
  Rubik_400Regular,
  Rubik_500Medium,
});

if (!fontsLoaded) {
  return null;
}
 
 if (admin){
   console.log("Rendering Admin View");

   return(
     <NavigationContainer>
     <MyDrawer_2/>
     </NavigationContainer>
   );
 
 }else{
   console.log("Rendering User View");
   return (
     <NavigationContainer>
     <MyDrawer/>
     </NavigationContainer>
   
   );
 };
 
};


// <StatusBar style="auto" />

//Sign Up Config for User Registration 
const signUpConfig = {
  header: "Registration",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
    {
      label: "Phone Number",
      key: "phone_number",
      required: false,
      displayOrder: 5,
      type: "phone_number",
    },
    {
      label: "Address",
      key: "address",
      required: false,
      displayOrder: 6,
      type: "string",
    },
  ],
};
const customTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: '#0374DD',
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: '#0374DD',
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: '#0374DD',
  },
  sectionFooterLinkDisabled: {
    ...AmplifyTheme.sectionFooterLinkDisabled,
    color: '#0374DD'
  }
};

//export default (App);
export default withAuthenticator(App,{signUpConfig, theme: customTheme}); 
