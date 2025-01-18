import React, { useState, useEffect } from 'react';
import {
    FlatList,
    StatusBar,
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Button,
} from 'react-native';

let originalData = [];

const App = () => {
    const [mydata, setMydata] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState(null);

    const handleItemPress = (item) => {
        setSelectedPlanet(item);
        setModalVisible(true);
    };

    const FilterData = (text) => {
        if (text !== '') {
            let myFilteredData = originalData.filter(
                (item) =>
                    item.Name && item.Name.toLowerCase().includes(text.toLowerCase())
            );
            setMydata(myFilteredData);
        } else {
            setMydata(originalData);
        }
    };

    useEffect(() => {
        fetch('https://mysafeinfo.com/api/data?list=planets&format=json&case=default')
            .then((response) => response.json())
            .then((myJson) => {
                if (originalData.length < 1) {
                    setMydata(myJson);
                    originalData = myJson;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleItemPress(item)}
        >
            <Text style={styles.cardText}>{item.Name || 'Untitled'}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <Text style={styles.search}>Planets Explorer</Text>

            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    FilterData(text);
                }}
                placeholder={'Search for a planet...'}
                placeholderTextColor="#888"
            />

            <FlatList
                data={mydata}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

            {selectedPlanet && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedPlanet.Name}</Text>
                            <Text style={styles.modalDescription}>
                                {selectedPlanet.Description}
                            </Text>
                            <Button
                                title="Close"
                                onPress={() => setModalVisible(false)}
                                color="#1f4068"
                            />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000814',
    },

    search: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: 20,
    },

    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#1f4068',
        backgroundColor: '#112B3C',
        borderRadius: 8,
        color: '#FFF',
        padding: 10,
        marginBottom: 20,
    },

    card: {
        backgroundColor: '#1a1a2e',
        borderWidth: 1,
        borderColor: '#162447',
        borderRadius: 10,
        padding: 15,
        elevation: 10,
        marginBottom: 15,
    },

    cardText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: '600',
        textAlign: 'center',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },

    modalContent: {
        backgroundColor: '#1a1a2e',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },

    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 10,
    },

    modalDescription: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default App;
