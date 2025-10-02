import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";

export default function AddUserScreen({ navigation, route }: any) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [company, setCompany] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");

    const handleAddUser = () => {
        if (!name || !email) {
            Alert.alert("Error", "Name and email are required!");
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            phone,
            website,
            company: { name: company },
            address: { street, city },
        };

        if (route.params?.onAdd) {
            route.params.onAdd(newUser);
        }

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Add New User</Title>

            <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} mode="outlined" />
            <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} mode="outlined" />
            <TextInput label="Phone" value={phone} onChangeText={setPhone} style={styles.input} mode="outlined" />
            <TextInput label="Website" value={website} onChangeText={setWebsite} style={styles.input} mode="outlined" />
            <TextInput label="Company" value={company} onChangeText={setCompany} style={styles.input} mode="outlined" />
            <TextInput label="Street" value={street} onChangeText={setStreet} style={styles.input} mode="outlined" />
            <TextInput label="City" value={city} onChangeText={setCity} style={styles.input} mode="outlined" />

            <Button mode="contained" onPress={handleAddUser} style={styles.button}>
                Save
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { marginBottom: 20, textAlign: "center" },
    input: { marginBottom: 12 },
    button: { marginTop: 10 },
});
