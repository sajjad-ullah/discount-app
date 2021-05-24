import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Alert, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Table, Row, Rows } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';

function HomeScreen({navigation,route}){
  const [getprice,setprice]=useState(0);
  const [getsave,setsave]=useState(0);
  const [getfinal,setfinal]=useState(0);
  const [getdiscount,setdiscount]=useState(0);
  const [getlist,setlist]=useState([]);
  React.useEffect(() => {
    if (route.params?.item) {
      setlist(route.params.item)
    }
  }, [route.params?.item]);
  
  const [getcheck,setcheck]=useState('true');
  useEffect(() => {
    calculate();
   
  });
  const calculate=()=>{
    if(getprice!= NaN){
    var temp=getprice * (getdiscount/100)
    setsave(temp)
    setfinal(getprice-temp)}
  }
  const save=()=>{
   if(getprice>0 && getdiscount>0){
      getlist.push({id:getlist.length,op:getprice ,dp:getdiscount, fp:getfinal});
      setcheck(true);
   }
   else{
     Alert.alert("Please Enter Both Original Price and Discount Percentage")
   }
  }
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
      style={{alignContent:'center',marginRight:5}}
      onPress={()=>{navigation.navigate('HistoryScreen',{item: getlist})}}
      >
        <Text style={{textAlign:'center',backgroundColor:'red',padding:10,color:'white',fontSize:18}}>History</Text>
      </TouchableOpacity>
    ),
  });
  return(
  <View style={styles.container}>
  <Text style={styles.title}>Discount App</Text>
  <TextInput
    style={styles.InputField}
    placeholder="Original Price"
    keyboardType = 'number-pad'
    onChangeText={text =>{
    if(!isNaN(text)){
      setprice(text);
      setcheck(false);

    }
 
    }
    
    }
    value={getprice}
    
  />
  <TextInput
    style={styles.InputField}
    placeholder="Discount Percentage"
    keyboardType = 'number-pad'
    onChangeText={text => {
      if(!isNaN(text) && text<=100){
      setdiscount(text);
      setcheck(false);
      }}}
      value={getdiscount}
    
  />
  
  <StatusBar style="auto" />
  <View>
    <Text style={styles.result}>You Save    : {getsave.toFixed(2)}</Text>
    <Text style={styles.result}>Final Price : {getfinal.toFixed(2)}</Text>
  <TouchableOpacity
  style={{alignContent:'center',backgroundColor:'red'}}
  onPress={()=>save()}
  disabled={getcheck}
  >
    <Text style={{textAlign:'center',padding:15,fontSize:22,color:'white'}
  }>SAVE</Text>
  </TouchableOpacity>
  </View>
  </View>);
}
function HistoryScreen({navigation,route}){
  // const[tableHead,settableHead]=useState(['Original Price', 'Discount', 'Final Price','Action']);
  //     const [tableData,settableData]=useState([     
  //     ]);
  // {data.map((item) => tableData.push([item.op,item.dp,item.fp]) )}
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
      style={{alignContent:'center',marginRight:5}}
      onPress={()=>{navigation.navigate('Home',{item: []})}}
      >
        <Text style={{textAlign:'center',backgroundColor:'red',padding:10,color:'white',fontSize:18}}>Clear History</Text>
      </TouchableOpacity>
    ),
  });
  
  const [data,setdata]=useState([...route.params.item]);
  function deleteitem(txt){
   const temp=data.filter((item) => item.id !== txt);
   setdata(temp);
  }
  return(
  
<View style={{margin:20}}>
  <Text style={{fontSize:20,textAlign:'center',padding:5}}>Your History</Text>
        {/* <Table borderStyle={{borderWidth: 2, borderColor: 'red'}}>
          <Row data={tableHead}  textStyle={{fontSize:20,padding:5}}/>
          <Rows data={tableData} textStyle={{fontSize:20,padding:5}}/>
        </Table> */}
        <DataTable>
    <DataTable.Header>
    <DataTable.Title>Original Price</DataTable.Title>
      <DataTable.Title>Discount %</DataTable.Title>
      <DataTable.Title>Final Price</DataTable.Title>
    <DataTable.Title>Action</DataTable.Title>

      
      
    </DataTable.Header>
    {data.map((item,index)=>{
     return( <DataTable.Row>
      <DataTable.Cell >{item.op}</DataTable.Cell>
        <DataTable.Cell >{item.dp}</DataTable.Cell>
        <DataTable.Cell >{item.fp}</DataTable.Cell>
      <DataTable.Cell><TouchableOpacity
      style={{backgroundColor:'red'}}
      onPress={()=>deleteitem(item.id)}
      
      
      >
        <Text style={{padding:5,color:'white'}}>DELETE</Text>
        </TouchableOpacity></DataTable.Cell>
        
        
      </DataTable.Row>
     );
    })}
    
    

    {/* <DataTable.Pagination
      page={1}
      numberOfPages={3}
      onPageChange={page => {
        console.log(page);
      }}
      label="1-2 of 6"
    /> */}
  </DataTable>
      <View>
  <TouchableOpacity
      style={{alignContent:'center',marginRight:5}}
      onPress={()=>{navigation.navigate('Home',{item: data})}}
      >
        <Text style={{textAlign:'center',backgroundColor:'red',padding:10,color:'white',fontSize:18}}>Go Back</Text>
      </TouchableOpacity>
      </View>
      </View>

);
}
const Stack = createStackNavigator();
export default function App() {
  return (
   
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          
        />
        <Stack.Screen
          name="HistoryScreen"
          component={HistoryScreen}
          options={({ navigation, route }) => ({
            headerTitle: 'History',
            headerLeft:null
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
