import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {

    const { signOut } = useAuth()
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 }}>
            <Text style={{ fontFamily: 'RobotoSlab-Regular', fontSize: 24, color: '#fff' }}>
                Novidades
            </Text>
            <TouchableOpacity
                style={{ 
                    height: 60, 
                    backgroundColor: '#ff9000', 
                    width: '100%', 
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center' 
                }}
                onPress={signOut} 
            >
                <Text
                    style={{
                        fontFamily: 'RobotoSlab-Regular',
                        fontSize: 18,
                        color: '#232139'
                    }}
                >
                    Sair 
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Dashboard