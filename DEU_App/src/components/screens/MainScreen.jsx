import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import RNSpeedometer from 'react-native-speedometer'
import {useTheme} from '@react-navigation/native';
import Theme from '../settings/theme.jsx';
import { LinearGradient } from 'expo-linear-gradient'
import * as Notification from "expo-notifications"




const Main = () => {
  const [precipitacion, setPrecipitacion] = useState(0.0)
  const [minutos, setMinutos] = useState(0)
  const key = "4eca0073128e406ba75160847222905"
  const place = "La Plata"
  const {colors} = useTheme();
  const theme= Theme();
  
  const fetchPrecipitacion = async () => {
    const response = await (await globalThis.fetch('https://api.weatherapi.com/v1/current.json?key='+key+"&q="+place+"&aqi=no", 
    {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin': "*"
      }
    }))
    const json = await response.json()
    setPrecipitacion(json.current.precip_mm)
    //setPrecipitacion(Math.round(Math.random()*100))
  }

  Notification.setNotificationHandler({
    handleNotification: async() => {
      return {
        shouldPlaySound: true,
        shouldShowAlert: true
      }
    }
  })

  const handleNotification = () => {
    Notification.dismissAllNotificationsAsync();
    Notification.scheduleNotificationAsync({
      content: {
        title: "Esta lloviendo mucho!",
        body: "La lluvia esta pasando los 50mm en este momento, estate atento!"
      },
      trigger: null
    })
  }

  useEffect(()=>{
    fetchPrecipitacion()
  },[])

  useEffect(() => {
    const timer = setInterval(() => {

      if (minutos*60 >= theme.updateTime.seconds){
        setMinutos(0)
        fetchPrecipitacion()
      }else{
        setMinutos(minutos+1)
      }
       

    }, 60000)
    return () => clearInterval(timer)
  },[minutos])

  useEffect(() => {
    if(precipitacion > 50){
      handleNotification()
    }
  }, [precipitacion])


  return (
    <View style={styles.container} accessible={true}>
        <View style={{alignItems: "center"}}>
          <Text style={{fontSize: theme.fontSizes.title, fontWeight: "bold", color:colors.text}}>Nivel de precipitaci??n</Text>
          <Text style={{fontSize: theme.fontSizes.subheading,fontStyle: "italic", color:colors.text}}>La Plata</Text>
        </View>
        
        <View style={{backgroundColor:colors.card, borderRadius:30, paddingLeft: 50, paddingRight: 50, paddingTop: 150, paddingBottom:150}}>
          <RNSpeedometer
              accessibleRole="image"
              value={precipitacion} 
              size={250} 
              maxValue={100}
              minValue={0}
              allowedDecimals={1}
              defaultValue={0}
              labelNoteStyle={{fontSize:theme.fontSizes.body,justifyContent:"center", color: "#000000"}}
              labels={[
                {
                  name: ((precipitacion != 1) ? "mil??metros" : "mil??metro") + "\nSin riesgo",
                  labelColor: colors.text,
                  labelNoteStyle: {alignContent: "center"},
                  activeBarColor: 'green'
                },
                {
                  name: ((precipitacion != 1) ? "milimetros" : "milimetro") + "\nRiesgo bajo",
                  labelColor: colors.text,
                  labelNoteStyle: {alignContent: "center"},
                  activeBarColor: 'yellow'
                },
                {
                  name: ((precipitacion != 1) ? "milimetros" : "milimetro") + "\nRiesgo intermedio",
                  labelColor: colors.text,
                  labelNoteStyle: {alignContent: "center"},
                  activeBarColor: 'orange'
                },
                {
                  name: ((precipitacion != 1) ? "milimetros" : "milimetro") + "\nRiesgo Alto",
                  labelColor: colors.text,
                  labelNoteStyle: {alignContent: "center"},
                  activeBarColor: 'red'
                }
              ]}
              />
          </View>

        <View style={[styles.info_container, styles.row]}>
          <Text style={{fontSize: theme.fontSizes.body,color: colors.text}}>Ultima actualizaci??n: </Text>
          <Text style={{fontSize: theme.fontSizes.body,color: colors.text}}>{minutos} minutos</Text>
        </View>
      
      </View>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    alignItems: "center", 
    justifyContent: "space-between", 
    flex:1
  },
  info_container: {
    alignContent: "space-around"
  },
  row: {
    flexDirection: "row",
  },
  container_pecipitation:{
    margin: 50,
    marginTop: 80,
    marginBottom: 20,
    padding:1
  }
})
