import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet,TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Picker } from "@react-native-picker/picker";
import KeyboardAvoidingWrapper from "../components/KeyBoardAvoiding/keyBoardAvoiding";
const statusBarHeight = getStatusBarHeight();
const Second = ({ navigation }) => {
  const [accommodation, setAccommodation] = useState("");
  
  const [rentReq, setRentReq] = useState("");

  const [income, setIncome] = useState("");
  const [plan, setPlan] = useState(12);
//   const navigation = useNavigation();
  const [view1Selected, setView1Selected] = useState(false);
  const [view2Selected, setView2Selected] = useState(false);
  const [view3Selected, setView3Selected] = useState(false);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  //   const handleNext = () => {
  //     if (accommodation !== '' && income !== '' && plan !== '' && (accommodation !== 'rent' || (accommodation === 'rent' && rent !== ''))) {
  //       navigation.navigate('PreApproval');
  //     } else {
  //       alert('Please fill all the required fields before continuing');
  //     }
  //   };
 
 

  const handleSubmit = async () => {
    try {
      const { data } = await axios.get(`https://difficult-fawn-headscarf.cyclic.app/loan/${rentReq}/${plan}`);
      const { monthlyPayment, totalPayment } = data;
      const monthlyPaymentFixed = monthlyPayment.toFixed(2);
      if ((view1Selected || view2Selected || view3Selected) && rentReq !=='' && income!==''&& plan!==0) {
        navigation.navigate('first', { rentReq, plan, monthlyPayment:monthlyPaymentFixed, totalPayment });
      }else{
        alert('Please fill in all fields')
      }
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} >
        <KeyboardAvoidingWrapper>
        <View>
      <Text style={styles.header}> My Rent</Text>
      <View style={styles.payView}>
        <View style={styles.payContain}>
          <Text style={{color:'#160554',fontSize:24,fontWeight:'700'}}>Payment Option</Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{color:'grey'}}> 1 of 3</Text>
          <Image source={require('../../assets/loads.png')}/>
          </View>
          
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ marginBottom: 10,color:'#7a7a7a'}}>What is your accommodation status?</Text>
          <View >

            <TouchableOpacity  onPress={() =>{
            setView1Selected(true) 
            setView2Selected(false)
            setView3Selected(false)}}>
          <View style={[styles.textFeild,{ borderColor: view1Selected ? '#1e207f' : "#CED4DA" }]}>
            <Text style={{ color: view1Selected ? '#1e207f' : "#CED4DA" }}>Looking to renew my rent</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() =>{
            setView1Selected(false) 
            setView2Selected(true)
            setView3Selected(false)}}>
          <View style={[styles.textFeild,{marginTop:20,borderColor: view2Selected ? '#1e207f' : "#CED4DA"}]}>
            <Text style={{ color: view2Selected ? '#1e207f' : "#CED4DA" }} >Want to pay for a new place</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() =>{
            setView1Selected(false) 
            setView2Selected(false)
            setView3Selected(true)}}>
          <View style={[styles.textFeild,{marginTop:20,borderColor: view3Selected ? '#1e207f' : "#CED4DA"}]}>
            <Text style={{ color: view3Selected ? '#1e207f' : "#CED4DA" }}>Im still searching</Text>
          </View>
          </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ marginBottom: 10,color:'#7a7a7a' }}>How much is your rent request amount</Text>
            <TextInput
              style={[styles.textFeild,{color: "#707070"}]}
              value={rentReq}
              onChangeText={(text) => setRentReq(text)}
              keyboardType="numeric"
              placeholder="Amount"
            />
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ marginBottom: 10,color:'#7a7a7a' }}>How much do you earn monthly</Text>
            <TextInput
              style={[styles.textFeild,{color: "#707070"}]}
              value={income}
              onChangeText={(text) => setIncome(text)}
              keyboardType="numeric"
              placeholder="Amount"
            />
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ marginBottom: 10,color:'#7a7a7a' }}>Choose a monthly Payment Plan</Text>
          <View style={styles.Picker}>
            <Picker
              selectedValue={plan}
              onValueChange={(itemValue) => setPlan(itemValue)}
              style={{color: "#CED4DA"}} 
            >
              <Picker.Item  label="1 Month" value={1} />
              <Picker.Item label="2 Months" value={2} />
              <Picker.Item label="3 Months" value={3} />
              <Picker.Item  label="4 Month" value={4} />
              <Picker.Item label="5 Months" value={5} />
              <Picker.Item label="6 Months" value={6} />
              <Picker.Item  label="7 Month" value={7} />
              <Picker.Item label="8 Months" value={8} />
              <Picker.Item label="9 Months" value={9} />
              <Picker.Item  label="10 Month" value={10} />
              <Picker.Item label="11 Months" value={11} />
              <Picker.Item label="12 Months" value={12} />
              
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.continue} onPress={handleSubmit}>
          <Text
            style={{
              fontWeight: "500",
              color: "#fff",
              
             fontSize:16,
             lineHeight:24
             
            }}
          >
            Next
          </Text>
        </TouchableOpacity>

      </View>
      </View>
      </KeyboardAvoidingWrapper>
    </ScrollView>
    </View>
  );
};

export default Second;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    marginVertical: 30,
    fontSize: 25,
    marginHorizontal: 20,
    color: "grey",
    fontWeight: "400",
  },
  payView: {
    // backgroundColor: "red",
    marginHorizontal: 10,
    // height: "80%",
    // alignItems:'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    // borderLeftWidth:2,
    // borderRightWidth:2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor: "#ffffff",
    elevation: 4,
  },
  payContain: {
    // backgroundColor: "red",
    alignItems: "flex-start",
    flexDirection:'row',
    // marginLeft:'-50%'
    justifyContent:'space-between'
  },
  textFeild: {
    backgroundColor: "#fffff",
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 15,
    borderColor: "#CED4DA",
    paddingHorizontal: 10,
    // justifyContent: "center",
    alignItems:'center',
    
  },
  
 Picker:{
    borderWidth: 0.5,
    borderRadius: 8,
 },
  inputContainer: {
    marginVertical: 20,
  },
  demark: {
    width: "100%",
    height: 2,
    borderRadius: 1,
    backgroundColor: "#D9DBE9",
    margin: 10,
    alignSelf: "center",
  },
  continue:{
    marginVertical: 30,
    backgroundColor: "#38c94b",
    width: "100%",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  }
});
