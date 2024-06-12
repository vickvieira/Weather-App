import { View, Text, Button} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { DrawerTypes } from '../routes/Drawer';

const Home = () => {
    const navigation = useNavigation<DrawerTypes>();
    return (
        <View style={{ marginTop: 60}}>
            <Text style={{textAlign: 'center'}}>homeeeee</Text>
            {/* <Button title="Detalhes" onPress={() => {
                navigation.navigate("Detalhes")
            }} ></Button> */}
            
        </View>
    );
};

export default Home;