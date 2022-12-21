import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"

export default function HomePage() {
  return (
    <View style={styles.HomePage}>
      <View style={styles.Group831}>
        <View style={styles.Navbar}>
          <Image
            style={styles.Lus_fiber_logo1}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/955od0t3fc-4%3A942?alt=media&token=5a9e7392-5a05-49f2-b7d6-6ae4d0964dc4",
            }}
          />
          <View style={styles.NavigationMenu}></View>
        </View>
        <Text style={styles.Txt367}>Outage Map</Text>
        <Image
          style={styles.MapPlaceholder1}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/955od0t3fc-4%3A1483?alt=media&token=9f569e9a-9abf-4deb-ab1c-adb052723f45",
          }}
        />
        <View style={styles.Button1}>
          <View style={styles.Button}>
            <View style={styles.Elements}>
              <Text style={styles.Txt626}>Report an Outage</Text>
            </View>
          </View>
        </View>
        <View style={styles.RecentNotifications}>
          <Text style={styles.Txt987}>Recent Activity</Text>
          <Text style={styles.Txt448}>
            Scheduled maintenance - internet will be down from 2-8pm October
            10th Lorem ipsum I’m lazy Carpe diem vene vidi vici
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  HomeScreenLoggedIn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 14,
    paddingBottom: 23,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: 360,
    height: 800,
  },
  Group831: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Navbar: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 0,
    paddingBottom: 14,
    paddingLeft: 15,
    paddingRight: 20,
    marginBottom: 13,
  },
  Lus_fiber_logo1: {
    width: 93,
    height: 42,
    marginRight: 202,
  },
  NavigationMenu: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "rgba(133,140,148,1)",
  },

  Txt367: {
    fontSize: 24,
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "600",
    color: "rgba(29,29,29,1)",
    textAlign: "center",
    justifyContent: "center",
    width: 187,
    height: 37,
    marginBottom: 9,
  },
  MapPlaceholder1: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  Button1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "rgba(0,0,0,0.24)",
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
  },
  Button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 32,
    backgroundColor: "rgba(232,108,0,0.9)",
  },
  Elements: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  Txt626: {
    fontSize: 16,
    fontFamily: "Source Sans Pro, sans-serif",
    fontWeight: "600",
    lineHeight: 24,
    color: "rgba(255, 255, 255, 1)",
  },

  RecentNotifications: {
    display: "flex",
    flexDirection: "column",
  },
  Txt987: {
    fontSize: 24,
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
    width: 175,
    height: 34,
    marginBottom: 8,
  },
  Txt448: {
    fontSize: 14,
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "400",
    color: "rgba(0,0,0,1)",
    width: 301,
    height: 219,
  },
})
