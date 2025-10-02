import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/usersSlice";

export default function UpdateUserScreen({ route, navigation }: any) {
    const { user } = route.params;
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const dispatch = useDispatch();

    const handleUpdate = () => {
        if (!name || !email) {
            Alert.alert("Error", "Name and email are required!");
            return;
        }

        const updatedUser = { ...user, name, email };
        dispatch(updateUser(updatedUser));
        Alert.alert("Success", "User updated successfully!");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            <Button title="Update User" onPress={handleUpdate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    label: { marginBottom: 5, fontWeight: "bold" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        marginBottom: 15,
        borderRadius: 5,
    },
});
