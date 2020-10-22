import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Dimensions, Button } from 'react-native'
import { CONSTANTS } from '../../../config/constants'
import CustomButton from '../../../components/Button'

const { height, width } = Dimensions.get('window')


function RechargeAccount(props) {

    const [amount, setAmount] = useState('')

    async function addAmount() {
        try {
            let body = {
                amount: amount,
                payAmount: 25000
            }
            const rechargeResponse = await fetch('https://qr-payment-server.herokuapp.com//api/wallet/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: "o2k3rofn34n23u40g"
                },
                body: JSON.stringify(body)
            })
            console.log(rechargeResponse.status)
            if (rechargeResponse.status == 200) {
                const res = await rechargeResponse.json()
                props.closePanel()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={[CONSTANTS.container, {
            zIndex: 1, backgroundColor: 'white', position: 'absolute', height, width,
        }]}>
            <TouchableOpacity onPress={props.closePanel} style={{
                position: 'absolute',
                margin: 10,
                justifyContent: 'center',
                height: 25, borderWidth: 0.34, width: 25,
                borderRadius: 50,
            }}>
                <Text style={{ alignSelf: 'center' }}>X</Text>
            </TouchableOpacity>
            <View style={{
                height, width,
                justifyContent: 'center',
                padding: 5,

            }}>
                <TextInput style={CONSTANTS.loginTextInput} value={amount} onChangeText={(e) => setAmount(e)} />
                {/* <Button title='Add' onPress={addAmount} /> */}
                <CustomButton title='Add' onPress={addAmount} />
            </View>
        </SafeAreaView>
    );
}

export default RechargeAccount;