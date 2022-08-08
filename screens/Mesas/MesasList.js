import react, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableHighlight } from 'react-native'
import {
  Oranienbaum_400Regular,
  useFonts
 } from "@expo-google-fonts/oranienbaum"
 import * as SplashScreen from 'expo-splash-screen';
 import * as Font from 'expo-font';
 
const MesaList = (props) => {

 const [_mesas, setMesas] = useState([])
 const [isLoading, setIsLoading] = useState(false)
  const [totalDelDia, setTotalDelDia] = useState(0)
  

  const [fontsLoaded] = useFonts({  
    oreniabum: Oranienbaum_400Regular
  })

  Font.loadAsync({
    'oranienbaum': Oranienbaum_400Regular
  }).then(() => {
    SplashScreen.hideAsync();
  }).catch(() => {
    SplashScreen.preventAutoHideAsync();
  }).done();


  const getTotal = async () => {
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
      setMesas(mesasJson.mesas)
      setTotalDelDia(mesasJson.total)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const eliminarMesa = async (id) => {
    try {
      setIsLoading(true)
      const mesas = await fetch('https://waiterservice-2022.herokuapp.com/deletemesa/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      await mesas.json()
      getTotal()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const vaciarTodasLasMesas = async () => {
    try {
      setIsLoading(true)
      const mesas = await fetch('https://waiterservice-2022.herokuapp.com/vaciartodaslasmesas', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      await mesas.json()
      getTotal()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

 useEffect(() => {
  fetch(`https://waiterservice-2022.herokuapp.com/mesas`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(res => res.json())
  .then(data => {
    setMesas(data.mesas)
    setTotalDelDia(data.total)
  }).catch(err => console.log(err)) 
  }  , [totalDelDia, _mesas]) 


  return (
    <View style={styles.container}>
      <View style={styles.cont_title}>
        <Text style={styles.text_title}>Mesas Disponibles</Text>
      </View>
          <ScrollView style={{ width:"99%", marginBottom:5, borderRadius:25}}>
      <View style={styles.cont_mesas_list}>
            {
              isLoading ? 
              <View style={styles.cont_loading}>
                <ActivityIndicator  size="large"  color="#0000ff" /> 
              </View>
              :
              
               _mesas.map(mesa => {
                return (
                  <View style={styles.mesa_view} key={mesa._id}>
                    <View style={styles.cont_view_row}>  
                      <View style={mesa.cerrada ? styles.cont_num_mesaCERRADA : styles.cont_num_mesa}>
                        <Text style={styles.text_num_mesa}>{
                          mesa.cerrada ? (
                            <Image  source={require('../../assets/close.png')} style={styles.img_cerrada} />
                          )  : mesa.numero
                        }</Text>
                      </View>
                      <View style={styles.cont_info_mesa}>
                        <View style={styles.view_personas}>
                          <Image style={styles.img_personas} source={require('../../assets/personas.png')} />
                          <Text style={styles.text_personas}>{mesa.cubiertos}</Text>
                        </View>
                        <View style={styles.view_personas}>
                          <Image style={styles.img_personas} source={require('../../assets/cubiertos.png')} />
                          <Text style={styles.text_personas}>{mesa.pedidos.length}</Text>
                        </View>
                        <View style={styles.view_precios}>
                            <Text style={styles.text_total}>${mesa.total}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.cont_buttons_ver}>
                    <TouchableHighlight style={styles.button_ver} onPress={() => props.navigation.navigate('mesa individual', {mesa: mesa})}>
                        <Text style={styles.text_button_ver}>Ver</Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.button_eliminar} onPress={() => eliminarMesa(mesa._id) }>
                        <Text style={styles.text_button_ver}>Eliminar</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                )
              }) 

            }
              
          
      </View>
          </ScrollView>
      <View style={styles.cont_actions}>
        <View style={styles.btn_mesas}>
          <Image style={styles.img_btn_mesas} source={require('../../assets/mesacont.png')} />
          <Text style={styles.text_btn_mesas2}>{_mesas.length}</Text>
        </View>
        <View style={styles.btn_precio}>
          <Text style={styles.text_btn_mesas2}>${totalDelDia}</Text>
        </View>
        <TouchableHighlight onPress={vaciarTodasLasMesas} style={styles.btn_vaciar}>
          <Text style={styles.text_btn_mesas}>Vaciar Mesas</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  cont_loading:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center" ,
    marginTop: "50%",
  },

  cont_view_row:{
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
  },

  container: {
    display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  height: '100%',
},
cont_title: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '95%',
  marginTop: 12,
  height: '12%',
  borderRadius: 15,
  backgroundColor: '#fff',
},
text_title:{
  fontSize: 52,
  letterSpacing: 1,
  fontFamily: 'londrina',
  color: '#000',
},

cont_num_mesaCERRADA:{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '35%',
  height: '40%',
  borderRadius: "60%",
  backgroundColor: '#ffff',
},
img_cerrada:{
  width: 45,
  height: 45,
},

/* contenido de mesas */
cont_mesas_list: {
  display:"flex",
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  width: '100%',
  height: "auto",
  backgroundColor: '#E4E3FF',
  borderRadius: 15,
  marginTop: 5,
  marginBottom: 15,
  marginLeft: 'auto',
  marginRight: 'auto',
},
cont_actions: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '95%',
  height: '8%',
  borderRadius: 15,
  backgroundColor: '#7FA5F0',
  marginBottom: 15,
  
},
btn_mesas: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '24%',
  height: '85%',
  borderRadius: 15,
  backgroundColor: '#FFB660',
},
btn_precio: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '35%',
  height: '85%',
  borderRadius: 15,
  backgroundColor: '#7CAC57',

},
btn_vaciar: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '35%',
  height: '85%',
  borderRadius: 15,
  backgroundColor: '#E1B493',

},
img_btn_mesas:{
  width: 40,
  height: 40,
},
text_btn_mesas:{
  fontSize: 23,
  fontFamily: 'londrinasolid',
  color: '#fff',
},
text_btn_mesas2:{
  fontSize: 32,
  fontFamily: 'londrinasolid',
  color: '#fff',
},

/* mesa view */
mesa_view:{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '46.5%',
  height: 200,
  backgroundColor: '#84a98c',
  borderRadius: 15,
  margin: 5,

}, 
cont_num_mesa:{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  width: '35%',
  height: '40%',
  backgroundColor: '#cad2c5',
  borderRadius: "60%",
},
text_num_mesa:{
  fontSize: 30,
  fontFamily: "oreniabum",
  color: '#000',
},

cont_info_mesa:{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',

  width: '50%',
  backgroundColor: '#d4a373',
  height: '80%',
  borderRadius: 15,
},
view_personas:{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  height: '27%',

},
img_personas:{
  width: 24,
  height: 24,
},
view_precios:{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '95%',
  height: '27%',
  backgroundColor: '#A2A2A2',
  borderRadius: 10,
},
text_personas:{
  fontSize: 20,
  fontFamily: 'oreniabum',
  color: '#fff',
  
},
text_total:{
  fontSize: 20,
  fontFamily: 'oreniabum',
  color: '#fff',
  letterSpacing: 1,
},
cont_buttons_ver:{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '95%',
  height: '18%',
  
  borderRadius: 5,
  marginBottom: 15,
},
button_ver:{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48%',
  height: '100%',
  borderRadius: 5,
  backgroundColor: '#00bbf9',
},
button_eliminar:{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48%',
  height: '100%',
  borderRadius: 5,
  backgroundColor: '#FF7373',
},
text_button_ver:{
  fontSize: 17,
  fontFamily: 'londrinasolid',
  color: '#fff',
  letterSpacing: 1,
  
}
})
export default MesaList