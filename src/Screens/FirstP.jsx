import React, { useState,useEffect } from "react";
import { View, Text, TextInput, Image, StyleSheet,TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
import KeyboardAvoidingWrapper from "../components/KeyBoardAvoiding/keyBoardAvoiding";
const statusBarHeight = getStatusBarHeight();


const PreApprovalScreen = ({route}) => {
  const [accommodation, setAccommodation] = useState("");
  const [text, setText] = useState("");
  const[newText,setNewText]=useState('');
  const [newSelectedValue,setNewSelectedValue]=useState('')
  const [loanAmounts, setLoanAmounts] = useState([]);
  // const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  
  const navigation = useNavigation();
  const { rentReq,plan,monthlyPayment } = route.params; //
  const [monthlyPay, setMonthlyPay] = useState(monthlyPayment);

  const monthlyInterestRate = 0.02;
    const maxMonthlyPayment = 12;
    
   
  

  useEffect(() => {
    if (route.params?.plan) {
      setSelectedValue(route.params.plan);
    }
  }, [route.params?.plan]);

  useEffect(() => {
    setText(route.params.rentReq);
  },[route.params.rentReq]);



  //   const handleNext = () => {
  //     if (accommodation !== '' && income !== '' && plan !== '' && (accommodation !== 'rent' || (accommodation === 'rent' && rent !== ''))) {
  //       navigation.navigate('PreApproval');
  //     } else {
  //       alert('Please fill all the required fields before continuing');
  //     }
  //   };

  //  const newMonthlyPayment = loanAmount * (monthlyInterestRate + (monthlyInterestRate / (Math.pow(1 + monthlyInterestRate, months) - 1)));
  //  const newtotalPayment = monthlyPayment * months;

  // const newcalc=()=>{
  //   const newMonthlyPayment = loanAmount * (monthlyInterestRate + (monthlyInterestRate / (Math.pow(1 + monthlyInterestRate, months) - 1)));
  //  const newtotalPayment = monthlyPayment * months;
  // }

  const handleSubmit = async () => {
    try {
      const { data } = await axios.get(`https://difficult-fawn-headscarf.cyclic.app/loan/${text}/${selectedValue}`);
      setMonthlyPay(data.monthlyPayment);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoanAmountChange = () => {
    setText(text);
    
    //setText('902010');
    handleSubmit();
  }
  //
const handlePickerChange =()=>{
  setSelectedValue(selectedValue)
}
  

const monthlybill = text * (monthlyInterestRate + (monthlyInterestRate / (Math.pow(1 + monthlyInterestRate, selectedValue) - 1)));
const totalPayment = monthlybill * selectedValue;

// console.log(monthlybill)

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingWrapper>
        <View>
      <Text style={styles.header}> My Rent</Text>
      <View style={styles.payView}>
        <View style={styles.payContain}>
        <Text style={{color:'#160554',fontSize:24,fontWeight:'700'}}>Payment Breakdown</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ marginBottom: 10,color:'#7a7a7a'}}>Rent request amount</Text>
          <View style={styles.textFeild}>
            <Text style={{ fontSize: 12, color: "#a1a1a3" }}>Amount</Text>
            <TextInput
              style={{color: "#707070"}}
              value={text}
              onChangeText={text => setText(text)}
              onEndEditing={handleLoanAmountChange}
              keyboardType="numeric"
              placeholder="Amount"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ marginBottom: 10,color:'#7a7a7a'}}>Monthly Payment Plan</Text>
          <View style={styles.textFeild}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
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

        <View style={styles.inputContainer}>
          <Text style={{ marginBottom: 10,color:'#7a7a7a'}}>Payment Option:</Text>
          <View style={styles.textFeild2}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between",paddingTop:15 }}
            >
              <Text style={{ fontSize: 12 }}>Pre-Approved Amount</Text>
              <Text style={{ fontSize: 12 }}>₦{text}</Text>
            </View>

            <View style={styles.demark} />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between",paddingTop:15}}
            >
              <Text style={{ fontSize: 12 }}>Monthly Payment:</Text>
              <Text style={{ fontSize: 12 }}>₦ {monthlybill.toFixed(2)}</Text>
            </View>

            <View style={styles.demark} />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between",paddingTop:15 }}
            >
              <Text style={{ fontSize: 12 }}>Tenor:</Text>
              <Text style={{ fontSize: 12 }}>{selectedValue} months</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.continue}  >
          <Text
            style={{
              fontWeight: "500",
              color: "#fff",
              
             fontSize:16,
             lineHeight:24
             
            }}
          >
            Accept
          </Text>
        </TouchableOpacity>
        </View>
      </View>
      
      </View>
      
</KeyboardAvoidingWrapper>
      </ScrollView>
    </View>
  );
};

export default PreApprovalScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    marginVertical: 20,
    fontSize: 25,
    marginHorizontal: 20,
    color: "grey",
    fontWeight: "400",
  },
  payView: {
    // backgroundColor: "red",
    marginHorizontal: 10,
    height: "85%",
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
    // marginLeft:'-50%'
  },
  textFeild: {
    backgroundColor: "#fffff",
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingVertical: -19,
    borderColor: "#CED4DA",
    padding: 10,
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor: "#ffffff",
    elevation: 4,
  },
  textFeild2: {
    backgroundColor: "#cbcca1",
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderColor: "grey",
    // padding:30,
    // justifyContent:'center',
    // padding: 40,
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
    // marginVertical: 30,
    backgroundColor: "#054B99",
    width: "100%",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop:40,
    marginBottom:50
  }
});
