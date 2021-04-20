import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,TextInput} from 'react-native';

export default function App() {
  const [getprice,setprice]=useState(0);
  const [getsave,setsave]=useState(0);
  const [getfinal,setfinal]=useState(0);
  const [getdiscount,setdiscount]=useState(0);
  useEffect(() => {
    {getdiscount};
    {getprice};
    calculate();
   
  });
  const calculate=()=>{
   
    var temp=getprice * (getdiscount/100)
    setsave(temp)
    setfinal(getprice-temp)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discount App</Text>
      <TextInput
        style={styles.InputField}
        placeholder="Original Price"
        keyboardType = 'number-pad'
        onChangeText={text => setprice(text)}
        
      />
      <TextInput
        style={styles.InputField}
        placeholder="Discount Percentage"
        keyboardType = 'number-pad'
        onChangeText={text => setdiscount(text)}
      />
      
      <StatusBar style="auto" />
      <View>
        <Text style={styles.result}>You Save    : {getsave}</Text>
        <Text style={styles.result}>Final Price : {getfinal}</Text>
      
      </View>
      
    </View>
    
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize:22,
    color:'red',
    padding:20

  },
  InputField: {
    borderBottomWidth:4,
    borderColor:'black',
    height:40,
    width:'80%',
    padding:10,
    margin:10
  },
  result:{
    fontSize:18,
    margin:10,
    padding:5
  }
});
