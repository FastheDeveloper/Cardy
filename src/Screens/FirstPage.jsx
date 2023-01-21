// import React, { useState } from 'react';
// import { View, Text, Button, TextInput, Picker, Alert } from 'react-native';
// import axios from 'axios';

// const PreApprovalScreen = () => {
//   const [accommodationStatus, setAccommodationStatus] = useState('renting');
//   const [rentAmount, setRentAmount] = useState(0);
//   const [monthlyIncome, setMonthlyIncome] = useState(0);
//   const [monthlyPaymentPlan, setMonthlyPaymentPlan] = useState('plan1');
//   const [showPreApproval, setShowPreApproval] = useState(false);

//   const handleSubmit = async () => {
//     try {
//         // validate data
//         // send data to server
//         const response = await axios.post('https://your-api-url.com/preapproval', {
//             accommodationStatus,
//             rentAmount,
//             monthlyIncome,
//             monthlyPaymentPlan,
//         });
//         if (response.data.status === 'approved') {
//             setShowPreApproval(true);
//         } else {
//             Alert.alert('Error', response.data.message);
//         }
//     } catch(error) {
//         Alert.alert('Error', 'An error occurred, please try again later.');
//     }
//   }
//   return (
//     <View>
//       {!showPreApproval && (
//         <View>
//           <Text>Accommodation Status:</Text>
//           <Picker
//             selectedValue={accommodationStatus}
//             onValueChange={(itemValue, itemIndex) =>
//               setAccommodationStatus(itemValue)
//             }>
//             <Picker.Item label="Renting" value="renting" />
//             <Picker.Item label="Owning" value="owning" />
//             <Picker.Item label="Living with parents" value="living_with_parents" />
//           </Picker>
  
//           {accommodationStatus === 'renting' && (
//             <View>
//               <Text>Rent Amount:</Text>
//               <TextInput
//                 value={rentAmount}
//                 onChangeText={text => setRentAmount(text)}
//               />
//             </View>
//           )}
  
//           <Text>Monthly Income:</Text>
//           <TextInput
//             value={monthlyIncome}
//             onChangeText={text => setMonthlyIncome(text)}
//           />
  
//           <Text>Monthly Payment Plan:</Text>
//           <Picker
//             selectedValue={monthlyPaymentPlan}
//             onValueChange={(itemValue, itemIndex) =>
//               setMonthlyPaymentPlan(itemValue)
//             }>
//             <Picker.Item label="Plan 1" value="plan1" />
//             <Picker.Item label="Plan 2" value="plan2" />
//             <Picker.Item label="Plan 3" value="plan3" />
//           </Picker>
//           <Button title="Next" onPress={handleSubmit} />
//         </View>
//       )}
//       {show
