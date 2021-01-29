import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function DeleteButton({deleteFunction, size, color, style}) {
    return (
        <TouchableOpacity 
        style={style}
        onPress={() => deleteFunction()}
        >
            <Icon name="delete" size={size} color={color} />
        </TouchableOpacity>
    );
}
