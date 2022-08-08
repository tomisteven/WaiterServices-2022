import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native'

function MesaView(props) {

  const [isLoading, setIsLoading] = React.useState(false)
  const [_mesa, setMesa] = React.useState([])
  const [pedidoNuevo, setPedidoNuevo] = React.useState({})
  const {_id} = props.route.params.mesa
  
  
   const getMesa = async () => {
    try {
      
    const mesa = await fetch(`https://waiterservice-2022.herokuapp.com/mesa/${_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      
    })
    const mesaJson = await mesa.json()
    setMesa(mesaJson)
    setIsLoading(false)
    console.log(_mesa);
    
    } catch (error) {
      console.log(error)
    }

  } 

  const sumarCubierto = async (id, number) => {
    try {
      setIsLoading(true)
      const cubierto = await fetch("https://waiterservice-2022.herokuapp.com/editcubiertos/"+id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cubiertos: number
        })
      })
      await cubierto.json()
      setIsLoading(false)
      console.log(_mesa, id);
    } catch (error) {
      console.log(error)
    }

  }

  const eliminarPedido = async (id_mesa, id_pedido) => {
    try {
      setIsLoading(true)
      const pedido = await fetch("https://waiterservice-2022.herokuapp.com/newmesa/" +id_pedido+"/delitem/"+id_mesa, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      await pedido.json()
      
    _mesa.pedidos.filter(pedido => pedido._id !== id_pedido)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleTextChange = (key, value) => {
    setPedidoNuevo({
      ...pedidoNuevo,
      [key]: value
    })
    console.log(pedidoNuevo);

  }

  const addPedido = async () => {
    try {
      setIsLoading(true)
      const pedido = await fetch("https://waiterservice-2022.herokuapp.com/newmesa/addpedido/"+_id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comida : pedidoNuevo.comida,
        cantidad : pedidoNuevo.cantidad,
        precio : pedidoNuevo.precio,
      })

    })
    await pedido.json()
    setPedidoNuevo({})
    getMesa()
    setIsLoading(false)
  }
  catch (error) {
    console.log(error)
  }
}
const cerrarMesa = async () => {
  try {
    setIsLoading(true)
    const mesa = await fetch("https://waiterservice-2022.herokuapp.com/cerrarmesa/"+_id , {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    await mesa.json()
    setIsLoading(false)
    props.navigation.navigate('mesas')
  } catch (error) {
    console.log(error)
  }
}

const vaciarMesa = async () => {
  try {
    setIsLoading(true)
    const mesa = await fetch("https://waiterservice-2022.herokuapp.com/vaciarmesa/"+_id , {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    await mesa.json()
    setIsLoading(false)
    getMesa()
  } catch (error) {
    console.log(error)
  }
}

  

   useEffect(() => {
     fetch(`https://waiterservice-2022.herokuapp.com/mesa/${_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
      setMesa(data)
    }).catch(err => console.log(err)) 

    
  } , [_mesa]) 


  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    /* titulo */
    cont_title: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '95%',
      height: '5%',
      position: 'relative',
      top: 30,
    },
    text_title: {
      fontSize: 40,
      letterSpacing: 2,
      color: '#000',
      fontFamily: 'londrina',
    },
    /* container de pedidos */
    cont_pedidos:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '99%',
      height: '83%',
      position: 'relative',
      top: 10,
      borderRadius: 15,
      backgroundColor: '#68AFE1',
    },

    /* container de botones de incremento de cubiertos*/
    cont_cubiertos_MASMENOS:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '99%',
      height: '6%',
      
    },
    cont_img_logo:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20%',
      height: '100%',
      
    },
    img_logo:{
      width:45,
      height: 45,
    },
    cont_incremento:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '70%',
      height: '90%',
      backgroundColor: '#fff',
      borderRadius: 25,
    },
    touch_incremento:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '30%',
      height: '100%',
      

    },
    img_incremento:{
      width: 25,
      height: 25,
    }, 
    cont_cantidad_cubiertos:{},
    text_cantidad_cubiertos:{},

    /* lista de pedidos  */
    cont_list_pedidos:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '98%',
      height: '70%',
      backgroundColor: '#BFE4FF',
      borderRadius: 15,
    },


    /* agregar pedidos */
    cont_agregar_pedido:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '98%',
      height: '20%',
      backgroundColor: '#FFDFB9',
      borderRadius: 15,
    },
    input_agregar_pedido:{
      backgroundColor: '#fff',
      borderRadius: 9, 
      width: '95%',
      height: 40,
      fontSize: 22,
      textAlign: 'left',
      fontFamily: 'oreniabum',
      paddingLeft: 10,
    },
    input_cantidad_agregar_pedido:{
      backgroundColor: '#fff',
      borderRadius: 9,
      width: '60%',
      height: 40,
      fontSize: 22,
      textAlign: 'left',
      fontFamily: 'oreniabum',
      paddingLeft: 10,
    },
    input_precios_agregar_pedido:{
      backgroundColor: '#fff',
      borderRadius: 9,
      width: '30%',
      height: 40,
      fontSize: 22,
      textAlign: 'left',
      fontFamily: 'oreniabum',
      paddingLeft: 10,

    },
    cont_preciocantidad:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '98%',
      height: '20%',
    },
    cont_button_add:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '48%',
      height: 35,
      borderRadius: 15,
      backgroundColor: '#7FC46E',

    },
    text_button_add:{
      fontSize: 20,
      letterSpacing: 1,
      color: '#fff',
      fontFamily: 'oreniabum',
    },




    /* contenido de botones */
    cont_actions:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '96%',
      height: '6%',
      borderRadius: 15,
      backgroundColor: '#68AFE1',
      position: 'relative',
      top: -9,
    },
    cont_button_precios:{
      backgroundColor: '#FC6666',
      borderRadius: 9,
      width: '30%',
      height: '80%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    text_button_precios:{
      fontSize: 25,
      color: '#fff',
      fontFamily: 'londrinasolid', 
    },
    cont_button_vaciar:{
      backgroundColor: '#9F6AE2',
      borderRadius: 9,
      width: '30%',
      height: '80%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    touch_button_vaciar:{},
    text_button_vaciar:{
      color: '#fff',
      fontSize: 25,
      fontFamily: 'oreniabum',
    },
    cont_button_cerrar:{
      backgroundColor: '#E59231',
      borderRadius: 9,
      width: '30%',
      height: '80%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',

    },
    touch_button_cerrar:{},
    text_button_cerrar:{
      color: '#fff',
      fontSize: 25,
      fontFamily: 'oreniabum',
    },
    scroll: {
      width: '100%',
      height: '100%',
      paddingTop: 10,
    },

    /* lista pedidos */
    item_pedido:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '99%',
      height: 45,
      
      borderRadius: 10,
      marginBottom: 10,
      marginLeft:"auto",
      marginRight:"auto",
    },
    img_pedido:{
      width: 30,
      height: 30,
      marginLeft: 10,
    },
    cont_text_pedido:{
      backgroundColor: '#fff',
      borderRadius: 9,
      width: '58%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
    },
    text_input:{
      fontSize: 16,
      color: '#000',
      fontFamily: 'oreniabum',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      marginLeft: 15,
    },
    text_pedido:{
      fontSize: 16,
      color: '#000',
      fontFamily: 'oreniabum',
      letterSpacing: 1,
    },
    cont_text_cantidad:{
      backgroundColor: '#fff',
      borderRadius: 19,
      width: '10%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cont_text_precio:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '20%',
      height: '100%',
      borderRadius: 9,
      backgroundColor: '#fff',
    },
    touch_button_delete:{},
    img_delete:{},
    

  })

  return (
    <View style={styles.container}>
      <View style={styles.cont_title}>
        <Text style={styles.text_title}>Mesa {_mesa.numero}</Text>
      </View>
      {
        isLoading ? <ActivityIndicator size="large" color="#0000ff" /> 
        :

      <View style={styles.cont_pedidos}>
        <View style={styles.cont_cubiertos_MASMENOS}>
          <View style={styles.cont_img_logo}>
            <Image style={styles.img_logo} source={require('../../assets/logo_cubiertos.png')} />
          </View>
          <View style={styles.cont_incremento}>
            <TouchableHighlight underlayColor={"transparent"} onPress={()=> sumarCubierto(_mesa._id,_mesa.cubiertos+1)} style={styles.touch_incremento}> 
              <Image style={styles.img_incremento} source={require('../../assets/mas.png')} />
            </TouchableHighlight>
            <View style={styles.cont_cantidad_cubiertos}>
              <Text style={styles.text_cantidad_cubiertos}>{_mesa.cubiertos} Cubiertos</Text>
            </View>
            <TouchableHighlight underlayColor={"transparent"} onPress={()=> sumarCubierto(_mesa._id, _mesa.cubiertos-1)} style={styles.touch_incremento}>
              <Image style={styles.img_incremento} source={require('../../assets/menos.png')} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.cont_agregar_pedido}>
          <TextInput value={pedidoNuevo.comida} onChangeText={ (value) =>handleTextChange("comida", value)} style={styles.input_agregar_pedido} placeholder="Agregar pedido" />
          <View style={styles.cont_preciocantidad}>
            <TextInput value={pedidoNuevo.cantidad} onChangeText={ (value) =>handleTextChange("cantidad", Number(value))} style={styles.input_cantidad_agregar_pedido} placeholder="Cantidad" />
            <TextInput value={pedidoNuevo.precio} onChangeText={ (value) =>handleTextChange("precio", Number(value))} style={styles.input_precios_agregar_pedido} placeholder="Precio" />
          </View>
          <TouchableHighlight onPress={addPedido} style={styles.cont_button_add}>
            <Text style={styles.text_button_add}>Agregar</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.cont_list_pedidos}>
        <ScrollView style={styles.scroll}>
          {
           _mesa._id ? _mesa.pedidos.map((pedido) => {
              return (
                <View key={pedido._id} style={styles.item_pedido}>
                  <View style={styles.cont_text_pedido}>
                    <Image style={styles.img_pedido} source={require('../../assets/menu.png')} />
                    <Text style={styles.text_input}>{pedido.comida}</Text>
                  </View>
                  <View style={styles.cont_text_precio}>
                    <Text style={styles.text_pedido}>$ {pedido.precio}</Text>
                  </View>
                  <View style={styles.cont_text_cantidad}>
                    <Text style={styles.text_pedido}>{pedido.cantidad}</Text>
                  </View>
                  <TouchableHighlight underlayColor={"transparent"} onPress={()=> eliminarPedido(_mesa._id, pedido._id)} style={styles.touch_button_delete}>
                    <Image style={styles.img_delete} source={require('../../assets/delete.png')} />
                  </TouchableHighlight>
                </View>
              )
            }): <ActivityIndicator style={{
              marginTop: '50%',
            }} size="large" color="#0000ff" /> 
          } 
       </ScrollView>
        </View>
        
      </View>
      }
      <View style={styles.cont_actions}>
        <View style={styles.cont_button_precios}>
          <Text style={styles.text_button_precios}>$ {_mesa.total}</Text>
        </View>
        <View style={styles.cont_button_vaciar}>
          <TouchableHighlight onPress={vaciarMesa} style={styles.touch_button_vaciar}>
            <Text style={styles.text_button_vaciar}>Vaciar</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.cont_button_cerrar}>
          <TouchableHighlight underlayColor={"transparent"} onPress={cerrarMesa} style={styles.touch_button_cerrar}>
            <Text style={styles.text_button_cerrar}>Cerrar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>

   )
}

export default MesaView