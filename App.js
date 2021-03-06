import React, { useState } from 'react';
import {

  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Button

} from 'react-native';
import { RNCamera } from "react-native-camera"


const PendingView = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <Text style={{
        fontSize: 30,
        color: "red"
      }}>
        Loading...
      </Text>
    </View>
  )
}

const App = () => {

  const [image, setImage] = useState(null);
  const takePicture = async (camera) => {
    try {
      const option = {
        quality: 0.9,
        base64: false
      }
      const data = await camera.takePictureAsync(option)
      setImage(data.uri)
    } catch (error) {
      console.warn(error)
    }
  }
  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.preview}>
          <Text style={styles.camText}>Here is your profile pic</Text>
          <Image style={styles.clickedPic} source={{ uri: image, width: "100%", height: "80%" }} />
          <Button
            title="Click a New Image"
            onPress={() => {
              setImage(null)
            }}
          >

          </Button>
        </View >
      ) : (
          <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: "permission to use camera",
              message: "longer text to use camera",
              buttonPositive: "OK",
              buttonNegative: "cancel"

            }}
            androidRecordAudioPermissionOptions={{
              title: "permission to use audio",
              message: "longer text to use audio",
              buttonPositive: "OK",
              buttonNegative: "cancel"

            }}
          >
            {({ camera, status }) => {
              if (status !== "READY") {
                return <PendingView />
              }
              else {
                return (
                  <View style={{
                    flex: 0,
                    flexDirection: "row",
                    justifyContent: "center"
                  }}>
                    <TouchableOpacity
                      onPress={() => { takePicture(camera) }}
                      style={styles.captureBtn}
                    >
                      <Text>SNAP</Text>
                    </TouchableOpacity>
                  </View>
                )
              }
            }}
          </RNCamera>
        )}

    </View>

  )
}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#0A79DF"

  },
  preview: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  captureBtn: {
    flex: 0,
    padding: 20,
    backgroundColor: "orange",
    alignSelf: "center",
    marginTop: 500,
    borderRadius: 70


  },
  camText: {

    backgroundColor: "#3498DB",
    color: "#FFF",
    width: "100%",
    marginBottom: 10,
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 25



  },
  clickedPic: {
    width: 300,
    height: 300,
    borderRadius: 150,

  }

})
