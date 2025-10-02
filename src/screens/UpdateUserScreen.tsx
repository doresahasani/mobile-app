import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/usersSlice";

export default function UpdateUserScreen({ route, navigation }: any) {
    const { user } = route.params;

    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [website, setWebsite] = useState(user.website || "");
    const [company, setCompany] = useState(user.company?.name || "");
    const [street, setStreet] = useState(user.address?.street || "");
    const [city, setCity] = useState(user.address?.city || "");

    const dispatch = useDispatch();

    const handleUpdate = () => {
        if (!name || !email) {
            Alert.alert("Error", "Name and email are required!");
            return;
        }

        const updatedUser = {
            ...user,
            name,
            email,
            phone,
            website,
            company: { name: company },
            address: { street, city },
        };

        dispatch(updateUser(updatedUser));
        Alert.alert("Success", "User updated successfully!");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Update User</Title>

            <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} mode="outlined" />
            <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} mode="outlined" />
            <TextInput label="Phone" value={phone} onChangeText={setPhone} style={styles.input} mode="outlined" />
            <TextInput label="Website" value={website} onChangeText={setWebsite} style={styles.input} mode="outlined" />
            <TextInput label="Company" value={company} onChangeText={setCompany} style={styles.input} mode="outlined" />
            <TextInput label="Street" value={street} onChangeText={setStreet} style={styles.input} mode="outlined" />
            <TextInput label="City" value={city} onChangeText={setCity} style={styles.input} mode="outlined" />

            <Button mode="contained" onPress={handleUpdate} style={styles.button}>
                Update
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
