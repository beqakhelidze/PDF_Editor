import React, { useEffect, useState} from 'react';
import {
    View,
    Button,
    StyleSheet,
} from 'react-native';
import * as DocumentPicker from 'react-native-document-picker';
import Editor from '../Components/editor';
import { useContextHelper } from '../context';

const Upload: React.FC = () => {

    const Context = useContextHelper();
    const uri = Context.uri;
    const [stateUrl, setStateUrl] = useState<string>('');

    useEffect(() => {
        if (Context.uri.length === 0) {
            setStateUrl('');
        }
    }, [Context.uri]);

    const pickDocument = async () => {
        let res = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf],
        });
        setStateUrl(res[0].uri);
    };

    if (uri.length !== 0) {
        return (
            <Editor />
        );
    }

    return (
        <View style={styles.container}>
            <Button
                title="Select Document"
                onPress={pickDocument}
            />
            <Button
                title="next"
                disabled = {stateUrl.length === 0}
                onPress = {() => Context.setUri(stateUrl as string)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});

export default Upload;