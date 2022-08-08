import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, ActivityIndicator } from 'react-native'
import {
  LondrinaShadow_400Regular,
  useFonts
} from "@expo-google-fonts/londrina-shadow"
import {
  LondrinaSolid_400Regular
} from "@expo-google-fonts/londrina-solid"
import { Jura_400Regular } from '@expo-google-fonts/jura'
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';



const Inicio = (props) => {

  const [fontsLoaded] = useFonts({
    londrina: LondrinaShadow_400Regular,
    londrinasolid: LondrinaSolid_400Regular,
    jura: Jura_400Regular
  })

  Font.loadAsync({
    'jura': Jura_400Regular,
    'londrina': LondrinaShadow_400Regular,
    'londrinasolid': LondrinaSolid_400Regular
  }).then(() => {
    SplashScreen.hideAsync();
  }).catch(() => {
    SplashScreen.preventAutoHideAsync();
  }).done();

  
  
  
  const [_mesas, setMesas] = useState()
  const [totalDelDia, setTotalDelDia] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  
  const getMesas = async () => {
    try {
      setIsLoading(true)
      const mesas = await fetch('https://waiterservice-2022.herokuapp.com/mesas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const mesasJson = await mesas.json()
      setTotalDelDia(mesasJson.total)
      setMesas(mesasJson.mesas)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const crearMesa = async () => {
    try {
      setIsLoading(true)
      const mesa = await fetch('https://waiterservice-2022.herokuapp.com/newmesa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const mesaa = await mesa.json()
      alert('Mesa ' + mesaa.numero + ' creada')
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
      getMesas()
  } , [_mesas])
  
  return (
    <View style={styles.container_home}>
        {
          !fontsLoaded && isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
            ) 
            : 
            (
              <>
            <View style={styles.cont_title}>
          <Text style={styles.text_title}>Waiter Service</Text>
        </View>
        <View style={styles.cont_actions}>
          <TouchableHighlight onPress={crearMesa}  style={styles.touch_imagen} underlayColor={"transparent"} >
            <Image source={require('../assets/agregarmesa.png')} style={styles.img_actions} />
          </TouchableHighlight>
          <TouchableHighlight underlayColor={"transparent"} style={styles.touch_imagen} onPress={()=> {props.navigation.navigate("mesas")} }>
            <Image source={require('../assets/mesasdisponibles.png')}  style={styles.img_actions} />
          </TouchableHighlight>
        </View>
        <View style={styles.cont_view_mesas}>
          <View style={styles.view_cerradas}>
            <Text style={styles.num_cerradas}>{
              _mesas ? _mesas.filter(mesa => mesa.cerrada === true).length : 0
            }</Text>
            <Text style={styles.text_cerradas}>Mesas Cerradas</Text>
          </View>
          <View style={styles.view_abiertas}>
            <Text style={styles.num_cerradas}>{
              _mesas ? _mesas.filter(mesa => mesa.cerrada === false).length : 0
            }</Text>
            <Text style={styles.text_cerradas}>Mesas Abiertas</Text>
          </View>
        </View>
        
          <LinearGradient colors={['#FFCB00', '#FF9100']} style={styles.cont_view_precio}>
            <Text style={styles.text_precio}>Total del dia: ${ 
              totalDelDia ? totalDelDia : 0
            }</Text>
          </LinearGradient>
        
        <View style={styles.cont_view_qr}>
          <TouchableHighlight style={styles.touch_imagen}>
            <Image source={require('../assets/qrpago.png')} style={styles.img_qr} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.touch_imagen}>
            <Image source={require('../assets/qrcarta.jpg')} style={styles.img_qr} />
          </TouchableHighlight>

        </View>
        <View style={styles.cont_qr_btn}>
          <View style={styles.view_qr_btn}>
            <Text style={styles.text_qr_btn}>QR Pago</Text>
          </View>
          <View style={styles.view_qr_btn}>
            <Text style={styles.text_qr_btn}>QR Carta</Text>
          </View>
        </View>
        </>
        )
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container_home: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E4E3FF',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
  },
  cont_title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    height: '13%',
    
  },
  text_title:{
    fontSize: 65,
    letterSpacing: 2,
    fontFamily: 'londrina',
    color: '#000',
  },
  cont_actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '99%',
    height: '23%',
    
    borderRadius: 15,
  },
  cont_view_mesas: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '99%',
    height: '10%',
    borderRadius: 15,
  },
  cont_view_precio: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '95%',
    height: '7%',
    backgroundColor: '#fff',
    borderRadius: 15,
    
  },
  cont_view_qr: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '95%',
    height: '25%',
    
    borderRadius: 15,
  },
  cont_qr_btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '95%',
    height: '7%',
    

  },

  /* acciones dentro de views */

  touch_imagen: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '50%',
    height: '100%',
    shadowColor: "#000",
      shadowOffset: {
        width: 0.3,
        height: 2,
      },
      shadowOpacity: 0.60,
        shadowRadius: 4.50,
        elevation: 1,
  },
  img_actions: {
    width: '93%',
    height: '100%',
    borderRadius: 15,
  },

  /* textos dentro de views */

  view_cerradas: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '45%',
    height: '100%',
    backgroundColor: '#FF8A8A',
    borderRadius: 25,
  },
  view_abiertas: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '45%',
    height: '100%',
    backgroundColor: '#72B262',
    borderRadius: 25,
  },
  text_cerradas: {
    fontSize: 26,
    color: '#fff',
    fontFamily: 'londrinasolid',
  },
  num_cerradas: {
    fontSize: 37,
    color: '#fff',
    fontFamily: 'londrinasolid',
  },

  /* precio */
  text_precio:{
    fontSize: 33,
    color: '#fff',
    fontFamily: 'jura',
  },
  
  /* qr */
  img_qr: {
    width: '95%',
    height: '95%',
    borderRadius: 15,
    
  },

  /* qr botones */
  view_qr_btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '45%',
    height: '100%',
    backgroundColor: '#4EA1DC',
    borderRadius: 15,
    
  },
  text_qr_btn: {
    fontSize: 26,
    color: '#fff',
    fontFamily: 'londrinasolid',
    letterSpacing: 2,
  }


})

export default Inicio